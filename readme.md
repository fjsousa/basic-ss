#Basic Signalling Server

Install:

`npm install fjsousa/basic-ss`

Run

`node index`

Open some tabs in your browser at 
`localhost:5000`. Go to the first tab and open the dev console. Write

```javascript
var allPeers = new AllPeers();

allPeers.update(function (peers) {
  console.log('You have %d peers', peers.length );

  allPeers.poke();
});

```


The other tabs should have some work to do.