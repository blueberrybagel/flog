angular.module('app',[]).controller('graphCtrl', graphCtrl);

function graphCtrl($scope){

    var svgcontainer = d3.select("#viz").append("svg")
        .attr("width", 600)
        .attr("height", 700);

    // 실시간 데이터로 처리
    var pathInfo = [
        {x: 10, y: 60}
        , {x: 50, y: 110}
        , {x: 90, y: 70}
        , {x: 140, y: 100}
    ];

    var newPathInfo = [];

    drawXAxis();
    draw();

    window.addEventListener("resize", draw);

    // TODO x 좌표 값 구하는 로직 필요
    $scope.addFeelingPoint = function(score, keyword){
        var tx = 100 + score;
        var ty = score;

        pathInfo.push({x: tx, y: ty, k: keyword});
        redraw(tx, ty);
    }

    function draw(w, h) {
        var point = getAllPoints()
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", 3.5)
            .style("fill", "black");

        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        var path = svgcontainer.append("path")
            .attr("class", "line")
            .attr("d", line(pathInfo))
            .style("stroke", "red")
            .style("fill", "none");

        addLabel();
    }

    function getAllPoints() {
        var circles = svgcontainer.selectAll("circle")
            .data(pathInfo)
            .enter()
            .append("circle");

        return circles;
    }

    function drawXAxis() {
        // 눈금 표시
        var xScale = d3.scaleLinear()
            .domain([0, 24])
            .range([10, 500]);

        var xAxis = d3.axisBottom(xScale);

        svgcontainer.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 200)")
            .call(xAxis);
    }

    // text to label
    function addLabel() {
        var text = svgcontainer.selectAll("label")
            .data(pathInfo)
            .enter()
            .append("text");

        var textLabels = text
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("k", function(d) { return d.k; })
            .text( function (d) { return d.k; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "red");
    }

    // update to the graph
    function redraw(w, h) {
        // added to the point
        var point = setPoint()
            .attr("cx", w)
            .attr("cy", h)
            .attr("r", 3.5)
            .style("fill", "red");

        // draw to the line
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        var path = svgcontainer.append("path")
            .attr("class", "line")
            .attr("d", line(pathInfo))
            .style("stroke", "red")
            .style("fill", "none");

        addLabel();
    }

}
