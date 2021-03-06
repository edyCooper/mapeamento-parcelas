describe('L.TileLayer.WMS.Format[\'application/vnd.ogc.gml\']', function () {
  var originalXmlParse;

  before(function() {
    originalXmlParse = L.TileLayer.WMS.Util.XML.parse;

    // Modify method to make possible to parse short GML strings.
    L.TileLayer.WMS.Util.XML.parse = function(gmlString) {
      var fullGmlString = '' +
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<root xmlns:gml="http://www.opengis.net/gml">' + gmlString + '</root>';

      return originalXmlParse(fullGmlString).firstChild;
    };
  });

  after(function() {
    // Restore original method.
    L.TileLayer.WMS.Util.XML.parse = originalXmlParse;
  });

  describe('#toGeoJSON', function () {
    it('parses gml:MultiLineString described by gml:coordinates elements with two coordinates', function () {
      var responseText = '' +
        '<gml:MultiLineString>' +
        '  <gml:lineStringMember>' +
        '    <gml:LineString>' +
        '      <gml:coordinates decimal="." cs="," ts=" ">1,2 3,4</gml:coordinates>' +
        '    </gml:LineString>' +
        '  </gml:lineStringMember>' +
        '  <gml:lineStringMember>' +
        '    <gml:LineString>' +
        '      <gml:coordinates decimal="." cs="," ts=" ">5,6 7,8</gml:coordinates>' +
        '    </gml:LineString>' +
        '  </gml:lineStringMember>' +
        '</gml:MultiLineString>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'MultiLineString',
        coordinates: [[[1.0, 2.0], [3.0, 4.0]], [[5.0, 6.0], [7.0, 8.0]]]
      });
    });

    it('parses gml:MultiLineString described by gml:coordinates elements with three coordinates', function () {
      var responseText = '' +
      '<gml:MultiLineString>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="." cs="," ts=" ">1,2,3 4,5,6</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="." cs="," ts=" ">7,8,9 10,11,12</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '</gml:MultiLineString>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'MultiLineString',
        coordinates: [[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0], [10.0, 11.0, 12.0]]]
      });
    });

    it('parses gml:MultiLineString described by gml:coordinates element with custom separators', function () {
      var responseText = '' +
      '<gml:MultiLineString>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="," cs="-" ts="|">1,0 - 2,0 - 3,0 | 4,0 - 5,0 - 6,0</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="," cs="-" ts="|">7,0 - 8,0 - 9,0 | 10,0 - 11,0 - 12,0</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '</gml:MultiLineString>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'MultiLineString',
        coordinates: [[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0], [10.0, 11.0, 12.0]]]
      });
    });

    it('parses gml:MultiLineString described by single gml:lineStringMember & gml:coordinates elements with two coordinates', function () {
      var responseText = '' +
      '<gml:MultiLineString>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="." cs="," ts=" ">1,2 3,4</gml:coordinates>' +
      '    </gml:LineString>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="." cs="," ts=" ">5,6 7,8</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '</gml:MultiLineString>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'MultiLineString',
        coordinates: [[[1.0, 2.0], [3.0, 4.0]], [[5.0, 6.0], [7.0, 8.0]]]
      });
    });

    it('parses gml:MultiLineString described by single gml:lineStringMember gml:coordinates elements with three coordinates', function () {
      var responseText = '' +
      '<gml:MultiLineString>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="." cs="," ts=" ">1,2,3 4,5,6</gml:coordinates>' +
      '    </gml:LineString>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="." cs="," ts=" ">7,8,9 10,11,12</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '</gml:MultiLineString>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'MultiLineString',
        coordinates: [[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0], [10.0, 11.0, 12.0]]]
      });
    });

    it('parses gml:MultiLineString described by gml:lineStringMember & element with custom separators', function () {
      var responseText = '' +
      '<gml:MultiLineString>' +
      '  <gml:lineStringMember>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="," cs="-" ts="|">1,0 - 2,0 - 3,0 | 4,0 - 5,0 - 6,0</gml:coordinates>' +
      '    </gml:LineString>' +
      '    <gml:LineString>' +
      '      <gml:coordinates decimal="," cs="-" ts="|">7,0 - 8,0 - 9,0 | 10,0 - 11,0 - 12,0</gml:coordinates>' +
      '    </gml:LineString>' +
      '  </gml:lineStringMember>' +
      '</gml:MultiLineString>';

      var format = L.TileLayer.WMS.Format['application/vnd.ogc.gml'];
      var point = format.toGeoJSON(responseText);

      expect(point).to.be.deep.equal({
        type: 'MultiLineString',
        coordinates: [[[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0], [10.0, 11.0, 12.0]]]
      });
    });
  });
});
