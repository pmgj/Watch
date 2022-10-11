class GUI {
    showAnalogWatch() {
        try {
            let clock = document.getElementById("aclock");
            let doc = clock.getSVGDocument();
            // Create new Date() object.
            let d = this.getTime();
            // Get current seconds.
            let s = d.getSeconds();
            // Get current minutes and add the current second.
            let m = d.getMinutes() + s / 60;
            // Get current hours and add the current minute.
            let h = d.getHours() + m / 60;
            // Rotate the second clockhand to the current seconds.
            doc.getElementById("Second").setAttribute("transform", `rotate(${s * 6}, 256, 256)`);
            doc.getElementById("SecondShadow").setAttribute("transform", `rotate(${s * 6}, 253, 259)`);
            // Rotate the minute clockhand to the current minute.
            doc.getElementById("Minute").setAttribute("transform", `rotate(${m * 6}, 256, 256)`);
            doc.getElementById("MinuteShadow").setAttribute("transform", `rotate(${m * 6}, 254, 258)`);
            // Rotate the hour clockhand to the current hour.
            doc.getElementById("Hour").setAttribute("transform", `rotate(${h * 30}, 256, 256)`);
            doc.getElementById("HourShadow").setAttribute("transform", `rotate(${h * 30}, 255, 257)`);
        } catch (ex) {

        }
        setTimeout(this.showAnalogWatch.bind(this), 1000);
    }
    showDigitalWatch() {
        let cleanDigits = () => {
            let clock = document.getElementById("dclock");
            let doc = clock.getSVGDocument();
            let paths = doc.getElementsByTagName("path");
            for (let i = 0; i < paths.length - 4; i++) {
                paths[i].setAttribute("class", "");
            }
        };
        let printDigits = (type, number) => {
            let digits = [[1, 1, 1, 0, 1, 1, 1], [0, 0, 1, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 1, 0, 1, 1], [0, 1, 1, 1, 0, 1, 0], [1, 1, 0, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1, 1], [1, 0, 1, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1]];
            let clock = document.getElementById("dclock");
            let doc = clock.getSVGDocument();
            let paths = doc.getElementsByTagName("path");
            let decimal = parseInt(number / 10);
            let unit = number % 10;
            for (let i = 0; i < 7; i++) {
                if (digits[decimal][i] === 1) {
                    paths[14 * type + i].setAttribute("class", "active");
                }
                if (digits[unit][i] === 1) {
                    paths[14 * type + i + 7].setAttribute("class", "active");
                }
            }
        };
        try {
            cleanDigits();
            let d = this.getTime();
            printDigits(0, d.getHours());
            printDigits(1, d.getMinutes());
            printDigits(2, d.getSeconds());
        } catch (ex) {

        }
        setTimeout(this.showDigitalWatch.bind(this), 1000);
    }
    getTime() {
        let date = new Date();
        let locale = date.toLocaleString("pt-br", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        return new Date(`October 13, 1975 ${locale}`);
    }
    showTimeInPage() {
        let d = this.getTime();
        let p = document.getElementById("raw");
        p.innerHTML = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
        setTimeout(this.showTimeInPage.bind(this), 1000);
    }
    selectWatch(evt) {
        let select = evt.currentTarget;
        let option = parseInt(select.value);
        let ps = document.querySelectorAll("p");
        ps.forEach((e, i) => e.style.display = i === option ? "block" : "none");
    }
    init() {
        let form = document.forms[0];
        form.option.onchange = this.selectWatch;
        this.showTimeInPage();
        this.showDigitalWatch();
        this.showAnalogWatch();
    }
}
let gui = new GUI();
gui.init();