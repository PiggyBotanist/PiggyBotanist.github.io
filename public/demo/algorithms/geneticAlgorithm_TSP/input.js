// Elements to listen to
const inputElement = document.getElementById('node-count');
    
inputElement.addEventListener('input', function(event) {
    const value = event.target.value;
    console.log('Input value changed to:', value);
});