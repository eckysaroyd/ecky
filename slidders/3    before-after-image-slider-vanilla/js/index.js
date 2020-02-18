// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.scroller').addEventListener('mousedown',function(){
    active = true;
    // Add our scrolling class so the scroller has full opacity while active
    document.querySelector('.scroller').classList.add('scrolling');
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('mouseleave',function(){
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
});

// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
    if (!active) return;
    // Their mouse is here...
    let x = e.pageX;
    // but we want it relative to our wrapper
    x -= document.querySelector('.wrapper').getBoundingClientRect().left;
    // Okay let's change our state
    scrollIt(x);
});

// Let's use this function
function scrollIt(x){
    // Calculate our transform
    let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper').offsetWidth)));
    // Display the correct amount of our 'after' image...
    document.querySelector('.before').style.width = transform+"px";
    // and move our scroller
    document.querySelector('.scroller').style.left = transform-25+"px";
}

// let's set our opening state based off the width
scrollIt(document.querySelector('.wrapper').offsetWidth-75);

// And finally let's add our touch events
document.querySelector('.scroller').addEventListener('touchstart',function(){
    active = true;
    document.querySelector('.scroller').classList.add('scrolling');
});
document.body.addEventListener('touchend',function(){
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('touchcancel',function(){
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
});

document.querySelector('.wrapper').addEventListener('touchmove',function(e){
    if (!active) return;
    e.preventDefault();
    let x = e.touches[0].pageX;
    x -= document.querySelector('.wrapper').getBoundingClientRect().left;
    scrollIt(x);
});