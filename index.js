// $('.triggers span').hover(function() {
//   console.log(this)
//   console.log($(this).data('letter'))
//     explode($(this).parents('.logo').attr('id'), $(this).data('letter'));
//   alert($(this).data('letter'))
// },function(){
//      implode($(this).parents('.logo').attr('id'), $(this).data('letter'));
// });





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
    svgElement.attr('fill-opacity', 0)


    // svgE
    // console.log(svgElement.children())

    paper.selectAll('#svg8 .l').forEach(function(e) {
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

    
    setTimeout(function(){
      
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
        svgElement.attr({"fill-opacity": val})
        console.log(val)
      }, 100)
    }, 100)
    

})


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 20) + min);
}

function explode(letterID, letter) {
    // if (animatingMap[letter])
    //   return
    // animatingMap[letter] = true
    $(' .letters g#' + letter).find('path,polygon').each(function() {

        $(this).velocity({
            translateZ: 0,
            translateX: random(-80, 200),
            translateY: random(-200, 180),
            rotateZ: "5deg",
            opacity: 0,
        });

    });
}


function implode(letterID, letter, s) {
  if (s===undefined)
    s == 170
    // if (animatingMap[letter])
    //   return
    // animatingMap[letter] = true
    $(' .letters g#' + letter).find('path, polygon').velocity({

        translateZ: 0,
        translateX: 0,
        translateY: 0,
        opacity: 1,
        rotateZ: "0deg",

    }, [s, 15]);
};