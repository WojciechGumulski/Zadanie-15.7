class Stopwatch extends React.Component {
    constructor(display) {
        super(display);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },   
        };
    }

    reset() {
        this.setState ({
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        });
    }

    
    format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
	}

	start() {
    	if (!this.state.running) {
        	this.setState ({
                running: true
            });
        	this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() {
    	if (!this.state.running) return;
    	this.calculate();
	}

	calculate() {
        if (!this.state.running) return;
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

        miliseconds++;

        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        this.setState({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        })
    }

	stop() {
    	this.state.running = false;
    	clearInterval(this.watch);
	}

	

    results() {
    	let wynik = this.format(this.times);
    	let rezultaty = document.getElementById('list');
    	let czas = document.createElement("li");
    	czas.innerText = wynik;
    	rezultaty.appendChild(czas);
    }

    clear () {
    	document.getElementById('list').innerHTML= "";
    }
    
    pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
       	result = '0' + result;
    }
    return result;
    }

    render() {
        return React.createElement('div', {},
            React.createElement('div', {className: 'controls'},
            React.createElement('button', {onClick: () => this.start()}, 'Start'),
            React.createElement('button', {onClick: () => this.stop()}, 'Stop'),
            React.createElement('button', {onClick: () => this.reset()}, 'Zeruj'),
            React.createElement('button', {onClick: () => {this.results()}}, 'Zapisz wynik'),
            React.createElement('button', {onClick: () => this.clear()}, 'Wyczyść listę wyników')
        ),
        React.createElement('div', {id: 'stopwatch'}, this.format())
        )
    }
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));