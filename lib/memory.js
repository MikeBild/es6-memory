export default { run };

function run(rootElement, items){
  items = items.concat(items);
  let moves = [];

  items
    .sort(() => 0.5 - Math.random())
    .forEach(item => createTile(rootElement, item, onSelected.bind({
      moves: moves,
      onVerified: onVerified
    })));

  function onVerified(data){
    if((data.success * 2) !== items.length) return;
    while (rootElement.firstChild) rootElement.removeChild(rootElement.firstChild);
    let div = document.createElement('div');
    div.className = 'Memory-tile--won';
    div.innerHTML = `WON!<br/>Moves: ${data.moves}<br/>Failures: ${data.failures}`;
    rootElement.appendChild(div);
  }

  function onSelected(evt){
    evt.srcElement.className = 'Memory-tile Memory-tile--wrong';
    evt.srcElement.innerHTML = evt.srcElement.value;
    this.moves.push(evt.srcElement);
    setTimeout(verify.bind(this), 300);
  }

  function verify(){
    this.onVerified(this.moves.reduce((previous, current) => {
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

  function createTile(element, value, onClick){
    let div = document.createElement('div');
    div.className = 'Memory-tile';
    div.onclick = onClick;
    div.value = value;
    element.appendChild(div);
    return div;
  }
}