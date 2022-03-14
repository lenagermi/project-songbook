/* eslint-env browser */

class Render {

    static renderFile(file, renderCanvas) {
        let reader = new FileReader();

        // eslint-disable-next-line no-loop-func
        reader.onload = function (e) {

            var
                //eslint-disable-next-line no-undef
                osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(renderCanvas, {
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
        if (file.name.match(".*.mxl")) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsText(file);
        }

    }
}

export default Render;