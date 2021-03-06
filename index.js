/**
 *
 * Convert DMS (sexagesimal) coordinates to DD
 * 
 */

//19 25 35.85N  099 12 07.48W

/**
 * TODO: Opción para limitar decimales y default
 */
// Consideraciones: 
// Las coordenadas siempre tendrán primero la latitud y después la longitud
// La dirección (N/S, E/W) siempre vendrá después del número

function DMS (degrees, minutes, seconds, orientation) {
  this.degrees = degrees;
  this.minutes = minutes;
  this.seconds = seconds;
  this.orientation = orientation;
}

function Coordinate(coordinateString) {
  const { latitude, longitude } = parseCoordinate(coordinateString);

  this.latitude = latitude;
  this.longitude = longitude;
}

Coordinate.prototype.toDd = function () {
  return [this.latitude, this.longitude]
    .map(dms => {
      const { degrees, minutes, seconds } = dms;
      let sum = parseInt(degrees) +
        parseInt(minutes) / 60 +
        parseFloat(seconds) / 3600;
      
      if (dms.orientation.match(/[SW]/)) {
        sum *= -1;
      }
        
      return parseFloat(sum.toFixed(6));
    });
}

Coordinate.prototype.toGeoJson = function () {
  return this.toDd().reverse();
}

const parseCoordinate = (coordinateString) => {
  // 1. Validar el formato
  // 19 25 35.85S    099 12 07.48W
  // o 19°25'35.85''N  099 12 07.48W
  
  const [lat, [latDir], long, [longDir]] = coordinateString
    .split(/([NSEW])/g)
    .filter(num => num)
    .map(num => num.trim())
    .map(part => part
      .split(/[ °'"]/)
      .filter(a => a));

  const latitude = new DMS(
    parseInt(lat[0]),
    parseInt(lat[1]),
    parseFloat(lat[2]),
    latDir);
  const longitude = new DMS(
    parseInt(long[0]),
    parseInt(long[1]),
    parseFloat(long[2]),
    longDir);

  return { latitude, longitude };
}

module.exports = Coordinate;
