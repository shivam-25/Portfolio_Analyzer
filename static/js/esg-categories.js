function esgGaugeCharts() {

  //use global variable declared in analysis.js
  var portfolioEsg = esgData[esgPortfolio];

  esgChart(portfolioEsg.esg_Sustainability, 10, "sustainability", '#3b1a40');
  esgChart(portfolioEsg.esg_Controversy, 10, "controversy", '#473793');
  esgChart(portfolioEsg.esg_Environmental, 10, "environmental", '#3c6df0');
  esgChart(portfolioEsg.esg_Social, 10, "social", '#00a68f');
  esgChart(portfolioEsg.esg_Governance, 10, "governance", '#56D2BB');

}

function esgChart(amount, total, esgType, color) {

  //esg gauge chart
  //source gauge chart: http://www.carbondesignsystem.com/data-vis/gauge/code
  var tau = 2 * Math.PI;
  var radius = 80;
  var padding = 30;
  var boxSize = (radius + padding) * 2;
  var ratio = amount / total;

  var arc = d3.arc().innerRadius(radius).outerRadius(radius - 10).startAngle(0);

  var svg = d3.select('#esg-' + esgType + '-chart').attr('width', boxSize).attr('height', boxSize);

  var g = svg.append('g').attr('transform', 'translate(' + boxSize / 2 + ', ' + boxSize / 2 + ')');

  //background Arc
  var background = g.append('path').datum({
    endAngle: tau
  }).style('fill', '#dfe3e6').attr('d', arc);

  //foreground Arc
  var foreground = g.append('path').datum({
    endAngle: 0
  }).style('fill', color).transition().duration(1000).delay(1000).attrTween('d', arcTween(ratio * tau));

  //text Labels
  var amountText = d3.select('.esg-' + esgType + '-amount');
  amountText.style('opacity', 0).transition().duration(1000).delay(1500).style('opacity', 1).text(amount.toFixed(2));
  const totalText = d3.select('.esg-' + esgType + '-total');
  totalText
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .delay(1700)
    .style('opacity', 1)
    .text(`/${10}`);

  //animation function
  function arcTween(newAngle) {
    return function(d) {
      var interpolate = d3.interpolate(d.endAngle, newAngle);
      return function(t) {
        d.endAngle = interpolate(t);

        return arc(d);
      };
    };
  }

}
