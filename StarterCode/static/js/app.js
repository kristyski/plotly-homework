// Use the D3 library to read in `samples.json`
function barChart(sampleID) {
  d3.json('samples.json').then(data => {
    
    // Get 'metadata' from the data
    var metadata = data.metadata;
    
    // Get test subject 'ids' from the data
    var names = data.names;
    
    // Get the 'samples' from the data
    var samples = data.samples;
    
    // filter data for the object with the desired sample number
    var resultArray = samples.filter(sampleObj => sampleObj.id == sampleID);
    var result = resultArray[0];

    let smplBar = result.sample_values;
    // console.log("smpl", smpl);
    let idsBar = result.otu_ids;
    let lblsBar = result.otu_labels;

    var slicedSmplBar = smplBar.slice(0, 10).reverse();
    var slicedIdsBar = idsBar.slice(0, 10).reverse();
    var slicedLblsBar = lblsBar.slice(0, 10).reverse();

    // add OTU to ID, create string
    let otuidslist = slicedIdsBar.map(otuid => 'OTU ' + otuid);

  //2. create bar chart  
    var trace1 = {
      x: slicedSmplBar,
      y: otuidslist,
      type: 'bar',
      text: slicedLblsBar,
      orientation: 'h'
    };

    var data = [trace1];

    Plotly.newPlot("bar", data);

  }).catch(error => console.log(error));
};
    //   3. Create a bubble chart that displays each sample.
function bubbleChart(sampleID) {
  d3.json('samples.json').then(data => {
    var metadata = data.metadata;
    var names = data.names;
    var samples = data.samples;

    var resultArray = samples.filter(sampleObj => sampleObj.id == sampleID);
    var result = resultArray[0];

    let smplBubble = result.sample_values;
    var idsBubble = result.otu_ids;
    var lblsBubble = result.otu_labels;

    var bubble = [
      {
      x: idsBubble,
      y: smplBubble,
      text: lblsBubble,
      mode: `markers`,
      marker: {
        size: smplBubble, 
        color: idsBubble
        }
      }
    ];
    
    var layout = {
      xaxis: {title: "OTU ID"}, 
      margin: { t: 0 },
      hovermode: "closest",
      margin: { t: 30},
      width: 1000,
      showlegend: false,
      title: "Belly Button Bacteria"
    };
    Plotly.newPlot('bubble', bubble, layout);

}).catch(error => console.log(error));
};

// 4. Display the sample metadata, i.e., an individual's demographic information.
function buildMetadata(sampleID) {
  d3.json("samples.json").then((data) => {
    const metadata = data.metadata;

    // filter data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleID);
    var result = resultArray[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    // console.log("names", data.names);

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    barChart(firstSample);
    bubbleChart(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  barChart(newSample);
  bubbleChart(newSample);
  buildMetadata(newSample);
}

init();