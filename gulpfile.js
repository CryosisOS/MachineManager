var gulp = require('gulp');

let dest = "./src/html/libs";

let targets = [];
targets.push("./node_modules/bootstrap/dist/css/bootstrap-grid.css");
targets.push("./node_modules/bootstrap/dist/css/bootstrap-grid.min.css");
targets.push("./node_modules/bootstrap/dist/css/bootstrap-reboot.css");
targets.push("./node_modules/bootstrap/dist/css/bootstrap-reboot.min.css");
targets.push("./node_modules/bootstrap/dist/css/bootstrap.css");
targets.push("./node_modules/bootstrap/dist/css/bootstrap.min.css");

gulp.task('default', async function () {
    targets.forEach(target => {
        gulp.src(target).pipe(gulp.dest(dest))
    });
});