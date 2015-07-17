var SummaryTool = require('node-summary');
var title = 'Why are books important?';
var content = 'When I think back on my life, I can define a set of books that shaped me — intellectually, emotionally, spiritually. Books have always been an escape, a learning experience, a saviour, but beyond this, greater than this, certain books became, over time, a kind of glue that holds together my understanding of the world. I think of them as nodes of knowledge and emotion, nodes that knot together the fabric my self. Books, for me anyway, hold together who I am.Books, in ways that are different to visual art, to music, to radio, to love even, force us to walk through another’s thoughts, one word at a time, over hours and days. We share our minds for that time with the writer’s. There is a slowness, a forced reflection required by the medium that is unique. Books recreate someone else’s thoughts inside our own minds, and maybe it is this one-to-one mapping of someone else’s words, on their own, without external stimuli, that give books their power. Books force us to let someone else’s thoughts inhabit our minds completely.Books are not just transferrers of knowledge and emotion, but a special kind of tool that flattens one self into another, that enable the trying-on of foreign ideas and emotions.This suppressing of the self is a kind of meditation too — and while books have always been important to me on their own (pre-digital) merits, it started to occur to me that “learning how to read books again,” might also be a way to start weaning my mind away from this dopamine-soaked digital detritus, this meaningless wash of digital information, which would have a double benefit: I would be reading books again, and I would get my mind back.And, there are, often, beautiful universes to be found on the other side of the cover of a book.';

SummaryTool.summarize(title, content, function(err, summary) {
    if(err) console.log("Something went wrong man!");

    console.log(summary);

    console.log("Original Length " + (title.length + content.length));
    console.log("Summary Length " + summary.length);
    console.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));
});
