namespace engine {
    export namespace RES {
        var RESOURCE_PATH = "././Resources/";
        export function getRes(path: string) {
            return new Promise(function (resolve, reject) {
                var result = new Image();
                result.src = RESOURCE_PATH + path;
                result.onload = () => {
                    resolve(result);
                }
            });
            // var result = new Image();
            // result.src = path;
            // result.onload = () => {
            //         return(result);
            // }
        }
    }
}