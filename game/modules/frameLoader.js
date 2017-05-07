define(function() {
  var parser = new vox.Parser();

  var load = function(frames) {
    var dfd = $.Deferred();
    frames = frames.map(function(_) {
      return "../models/" + _ + ".vox";
    }).map(function(url) {
      return parser.parse(url);
    });

    Promise
      .all(frames)
      .then(function(dataList) {
        var meshList = [];
        dataList.forEach(function(data) {
          var builder = new vox.MeshBuilder(data);
          var mesh = builder.createMesh();
          mesh.castShadow = true;
          mesh.receiveShadow = false;
          meshList.push(mesh);
        });
        dfd.resolve(meshList);
      });

    return dfd;
  };

  return {
    load: load
  };

});
