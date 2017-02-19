// $('.triggers span').hover(function() {
//   console.log(this)
//   console.log($(this).data('letter'))
//     explode($(this).parents('.logo').attr('id'), $(this).data('letter'));
//   alert($(this).data('letter'))
// },function(){
//      implode($(this).parents('.logo').attr('id'), $(this).data('letter'));
// });

var animationMap = {}
/*
  id: {
    implodingQueued,
    explodingQueued
  }
*/

var animDoneCount = 0;
var wordCount = 8;

paper = Snap('#l')

paper.attr({
  width: window.innerWidth,
  height: window.innerHeight
});

Snap.load('./catalyst.svg', function(frag) {
    var svgElement = frag.select("svg");
    console.log(frag)
    // console.log(frag.select(".letter"))
    paper.append(svgElement)
    svgElementClone = svgElement
    paper.attr('fill-opacity', 0)

    var arr = svgElementClone.node.children[0].children;

    console.log(svgElementClone.node.children[0].children)



    // svgE
    // console.log(svgElement.children())

    paper.selectAll('#svg8 .l').forEach(function(e) {

        animationMap[e.node.id] = {
          implodingQueued: false,
          explodingQueued: false
        }


        console.log("WHOO")
        e.hover(function(){
          console.log(e.node.id)
          explode(null, e.node.id)
        }, function(){
          implode(null, e.node.id)
        })

        // explode(null, e.node.id)
        implode(null, e.node.id, 0)


    })

    
    // setTimeout(function(){
      
    //   var group = paper.select("#allLetters")
    //   // console.log(group.getBBox().w)
    //   console.log(paper.attr('width'))
    //   console.log(group.getBBox())
    //   var dx = (paper.attr('width') - group.getBBox().w)/2
    //   var dy = (paper.attr('height') - group.getBBox().h)/2
    //   console.log(dx, dy)
    //   var scaleFactor = Math.min(paper.attr('width') / group.getBBox().w, paper.attr('height') / group.getBBox().h)*.9
    //   console.log(scaleFactor)
    //   group.transform("T" + dx + "," + dy+"s" + scaleFactor + "," + scaleFactor)  
    //   Snap.animate(0, 1, function(val){
    //     svgElement.attr({"fill-opacity": val})
    //     console.log(val)
    //   }, 100)
    // }, 100)
    

})


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 20) + min);
}

function explode(letterID, letter) {
    // if (animatingMap[letter])
    //   return
    // animatingMap[letter] = true
    if (animationMap[letter].explodingQueued)
      return
    animationMap[letter].explodingQueued = true
    $(' .letters g#' + letter).find('path,polygon').each(function() {

        $(this).velocity({
            translateZ: 0,
            translateX: random(-80, 200),
            translateY: random(-200, 180),
            rotateZ: "5deg",
            opacity: 0,
        }, function() {
          animationMap[letter].explodingQueued = false
        });

    });
}


function implode(letterID, letter) {
    // if (animationMap[letter].implodingQueued)
    //   return
    animationMap[letter].implodingQueued = true
    var added = false
    $(' .letters g#' + letter).find('path, polygon').velocity({

        translateZ: 0,
        translateX: 0,
        translateY: 0,
        opacity: 1,
        rotateZ: "0deg",

    }, [170, 15], function() {

      if (!added && animDoneCount < 8) {
        
        console.log("whoo")
        added = true;
        animDoneCount++;
        if (animDoneCount == 8) {
          console.log("!!")
          var group = paper.select("#allLetters")
  // console.log(group.getBBox().w)
          console.log(paper.attr('width'))
          console.log(group.getBBox())
          var dx = (paper.attr('width') - group.getBBox().w)/2
          var dy = (paper.attr('height') - group.getBBox().h)/2
          console.log(dx, dy)
          var scaleFactor = Math.min(paper.attr('width') / group.getBBox().w, paper.attr('height') / group.getBBox().h)*.9
          console.log(scaleFactor)
          group.transform("T" + dx + "," + dy+"s" + scaleFactor + "," + scaleFactor)  
          Snap.animate(0, 1, function(val){
            paper.attr({"fill-opacity": val})
            console.log(val,"-")
          }, 500)
        }
      }
    }); 
};