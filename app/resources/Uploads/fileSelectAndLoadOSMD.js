/* eslint-disable no-alert */
/* eslint-disable no-constant-condition */
var currentFile;

class OSMDupload {

  static handleFileSelect(evt) {
    var files = evt.target.files;

    if (files[0].name.match(".*.xml") && files[0].name.match(".*.musicxml")) {
      currentFile = files[0];

      let reader = new FileReader();

      // eslint-disable-next-line no-loop-func
      reader.onload = function (e) {

        var
          //eslint-disable-next-line no-undef
          osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
            backend: "svg",
            drawFromMeasureNumber: 1,
            drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER,
          });

        osmd
          .load(e.target.result)
          .then(
            function () {
              window.osmd = osmd;
              osmd.render();

            }
          );
      };
      if (files[0].name.match(".*.mxl")) {
        reader.readAsBinaryString(files[0]);
      } else {
        reader.readAsText(files[0]);
      }

    } else {
      alert("Sie haben keine Xml-Datei ausgewählt. Bitte wählen Sie nur Musik-XML-Dateien aus.");
    }
  }

  static handleFileSelectUpdate(evt) {
    var files = evt.target.files; // FileList object

    if (files[0].name.match(".*.xml") && files[0].name.match(".*.musicxml")) {
      currentFile = files[0];

      let reader = new FileReader();

      // eslint-disable-next-line no-loop-func
      reader.onload = function (e) {

        var
          //eslint-disable-next-line no-undef
          osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvasUpdate", {
            backend: "svg",
            drawFromMeasureNumber: 1,
            drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER,
          });
        osmd
          .load(e.target.result)
          .then(
            function () {
              window.osmd = osmd;
              osmd.render();
            }
          );
      };
      if (files[0].name.match(".*.mxl")) {
        reader.readAsBinaryString(files[0]);
      } else {
        reader.readAsText(files[0]);
      }

    } else {
      // eslint-disable-next-line no-alert
      alert("Sie haben keine Xml-Datei ausgewählt. Bitte wählen Sie nur Musik-Xml-Dateien aus.");
    }
    return files[0];
  }

  static getFile() {
    return currentFile;
  }
}

export default OSMDupload;
