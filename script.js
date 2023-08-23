const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader =  document.getElementById('loader');

let apiQuotes = [];

//  show loading
function loading (){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//  hide loading
function complete (){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// show new quotes 
function newQuotes (){
    loading ();
    //  pick a ranadom wuote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // check if author fied is blank and replace it 'unknown'
    if (!quote.author){
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //  check the quote length to determine styling 
    if(quote.text.length>30 ){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //  set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// get quotes from api 
async function getQuotes () {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch (apiURL);
        apiQuotes = await response.json();
        newQuotes();
    } catch (error) {
        // catch error here
    } 
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}` ;
    window.open(twitterUrl,'_blank');

}

// event listners
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);

//  on load 
getQuotes();

