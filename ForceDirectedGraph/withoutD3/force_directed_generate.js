const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

var k;
var MAX_DIST = 5
var NODE_NUM = 40
var myNodeList = [];
var myEdgeList = [];
var myNodeMap = {};
var dxMap = {}, dyMap = {};

class Node {
    constructor(id = null) {
        this.id = id;
        this.x = 22; //random initial value?
        this.y = null;
    }
}
class Edge {
    constructor(source = null, target = null) {
        this.source = source;
        this.target = target;
    }
}
class Graph {
    constructor(nodes = null, links = null) {
        this.nodes = nodes;
        this.links = links;
    }
}

//Calculate displacement caused by repulsive force
function calculateRepulsion() {
    let ejectFactor = 8;
    let distX, distY, dist;
    for (let i = 0; i < myNodeList.length; i++) {
        let id = myNodeList[i].id;
        dxMap[id] = 0.0;
        dyMap[id] = 0.0;
        for (let j = 0; j < myNodeList.length; j++) {
            if (i !== j) {
                distX = myNodeList[i].x - myNodeList[j].x;
                distY = myNodeList[i].y - myNodeList[j].y;
                dist = Math.sqrt(distX * distX + distY * distY);
            }
            // if (dist < 30) {
            //     ejectFactor = 5;
            // }
            if (dist > 0 && dist < 250) {
                dxMap[id] += k * k / dist * ejectFactor * (distX / dist); //x component
                dyMap[id] += k * k / dist * ejectFactor * (distY / dist); //y component
            }
        }
    }
}

//Calculate displacement caused by attractive force
function calculateAttraction() {
    let condenseFactor = 2;
    let startNode, endNode;
    for (let i = 0; i < myEdgeList.length; i++) {
        let eStartID = myEdgeList[i].source;
        let eEndID = myEdgeList[i].target;
        startNode = myNodeMap[eStartID];
        endNode = myNodeMap[eEndID];
        if (!startNode) {
            console.log("Cannot find start node id:" + eStartID);
            return;
        }
        if (!endNode) {
            console.log("Cannot find end node id:" + eEndID);
            return;
        }
        let distX, distY, dist;
        distX = startNode.x - endNode.x;
        distY = startNode.y - endNode.y;
        dist = Math.sqrt(distX * distX + distY * distY);
        dxMap[eStartID] -= k * condenseFactor * distX;
        dyMap[eStartID] -= k * condenseFactor * distY;
        dxMap[eEndID] += k * condenseFactor * distX;
        dyMap[eEndID] += k * condenseFactor * distY;
    }
}


function updateCoordinates() {
    for (let v = 0; v < myNodeList.length; v++) {
        let node = myNodeList[v];
        let dx = dxMap[node.id];
        let dy = dyMap[node.id];
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > MAX_DIST) {
            dx = dx / dist * MAX_DIST;
            dy = dy / dist * MAX_DIST;
        }
        node.x += dx;
        node.y += dy;
    }
}


function ForceDirected(){
    //Generate nodes and edges
    for (let i = 0; i < NODE_NUM; i++) {
        myNodeList.push(new Node(i));
    }
    for (let i = 0; i < NODE_NUM; i++) {
        let perlink = Math.floor(Math.random()*8);
        let edgeCount = Math.floor(Math.random() * perlink) + 1;
        for (let j = 0; j < edgeCount; j++) {
            let targetID = Math.floor(Math.random() * NODE_NUM);
            let edge = new Edge(i, targetID);
            myEdgeList.push(edge);
        }
    }
    if (myNodeList && myEdgeList) {
        k = Math.sqrt(CANVAS_WIDTH * CANVAS_HEIGHT / myNodeList.length);
    }
    for (let i = 0; i < myNodeList.length; i++) {
        let node = myNodeList[i];
        if (node) {
            myNodeMap[node.id] = node;
        }
    }

    //Generate initial coordinates randomly
    let initialX, initialY, initialSize = 40.0;
    for (let n in myNodeList) {
        initialX = CANVAS_WIDTH * 0.5;
        initialY = CANVAS_HEIGHT * 0.5;
        myNodeList[n].x = initialX + initialSize * (Math.random() - 0.5);
        myNodeList[n].y = initialY + initialSize * (Math.random() - 0.5);
    }

    //Iterate 1000 times to update coordinates
    for (let i = 0; i < 1000; i++) {
        calculateRepulsion();
        calculateAttraction();
        updateCoordinates();
    }
    return new Graph(myNodeList, myEdgeList);
}