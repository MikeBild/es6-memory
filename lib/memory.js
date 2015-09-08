export default { run };

function run(rootElement, items){
  items = items.concat(items);
  let moves = [];

  items
    .sort(() => 0.5 - Math.random())
    .forEach(item => createElement(rootElement, item, onClick.bind({
      moves: moves,
      onMove: onMove
    })));

  function onMove(data){
    if((data.success * 2) !== items.length) return;
    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild);
    let div = document.createElement('div');
    div.className = 'Memory-tile--won';
    div.innerHTML = `WON!<br/>Moves: ${data.moves}<br/>Failures: ${data.failures}`;
    rootElement.appendChild(div);
  }

  function onClick(evt){
    evt.srcElement.className = 'Memory-tile Memory-tile--wrong';
    evt.srcElement.innerHTML = evt.srcElement.value;
    this.moves.push(evt.srcElement);
    setTimeout(move.bind(this), 300);
  }

  function move(){
    this.onMove(this.moves.reduce((previous, current) => {
      if(previous.target &&
          previous.target !== current &&
          previous.target.className === 'Memory-tile Memory-tile--wrong' &&
          previous.target.value === current.value) {
        previous.success += 1;
        previous.target.onclick = undefined;
        current.onclick = undefined;
        previous.target.className = 'Memory-tile Memory-tile--right';
        current.className = 'Memory-tile Memory-tile--right';
        previous.target.innerHTML = previous.target.value;
        current.innerHTML = current.value;
      } else if(previous.target &&
                previous.target.className === 'Memory-tile Memory-tile--wrong') {
        previous.failures += 1;
        previous.target.className = 'Memory-tile';
        current.className = 'Memory-tile';
        previous.target.innerHTML = '';
        current.innerHTML = '';
      } else {
        current.className = 'Memory-tile Memory-tile--wrong';
        current.innerHTML = current.value;
      }
      previous.moves = previous.success + previous.failures;
      previous.target = current;
      return previous;
    }, {
      target: undefined,
      success: 0,
      failures: 0,
      moves: 0
    }));
  }

  function createElement(element, value, onClick){
    let div = document.createElement('div');
    div.className = 'Memory-tile';
    div.onclick = onClick;
    div.value = value;
    element.appendChild(div);
    return div;
  }
}