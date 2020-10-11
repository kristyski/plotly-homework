// per HB, pull data in to console.log it, reference where it lives in reference to the .html file
// Use the D3 library to read in `samples.json`
// https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js
d3.json('samples.json').then(data => {
  // console.log(data);

// Get 'metadata' from the data
  var metadata = data.metadata;
  // console.log(metadata);
  
// Get test subject 'ids' from the data
  var names = data.names;
  // console.log(names);

// Get the 'samples' from the data
  var samples = data.samples;
  // console.log(samples);

// populate data into the Test Subject ID No. dropdown list
// Select the d3 input element for the dropdown
  const selection = d3.select("#selDataset");

// Build Test Subject ID drop down
  names.forEach(namevalue =>{
    var option = selection.append("option");
    option.text(namevalue);
    option.attr("value", namevalue);
  });
  
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.
  let smpl = data.samples[0].sample_values;
    console.log("smpl", smpl);
  let ids = data.samples[0].otu_ids;
  let lbls = data.samples[0].otu_labels;

  var slicedSmpl = smpl.slice(0,10).reverse();
  var slicedIds = ids.slice(0,10).reverse();
  var slicedLbls = lbls.slice(0,10).reverse();

// add OTU to ID, create string; not working yet
  let otuidslist = slicedIds.map(otuid => 'OTU ' + otuid);

  var trace1 = {
    x: slicedSmpl,
    y: otuidslist,
    type: 'bar',
    text: slicedLbls,
    orientation: 'h'
  };

  var data = [trace1];

  Plotly.newPlot("bar", data);


//   3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.


// var plotData = `/samples/${sample}`;
// d3.json(plotData).then(function (data) {

// // use sample data
  // var x_axis = plotData.data.otu_ids;
  // var y_axis = plotData.data.sample_values;
  // var size = plotData.data.sample_values;
  // var color = plotData.data.otu_ids;
  // var texts = plotData.data.otu_labels;

  // var bubble = {
  //   x: x_axis,
  //   y: y_axis,
  //   text: texts,
  //   mode: `markers`,
  //   marker: {
  //     size: size, 
  //     color: color
  //   }
  // };
    
  // var data = [bubble];

  // var layout = {
  //   xaxis: {title: "OTU ID"}, 
  //   title: "Belly Button Bacteria"
  // };

  // Plotly.newPlot('bubble', data, layout);

}).catch(error => console.log(error));


// function updatePlotly(newdata){
//   var BAR = document.getElementById("bar");
//   Plotly.restyle(BAR, "values", (newdata);)
// }

// function getData(dataset) {
//   var data = [];
//   switch (dataset){
//     case "?"
//   }
//   updatePlotly{data};
// }

// all goes code inside brackets; code outside of last bracket is going to run before promise (above) is fulfilled
// })

// init();


// // INSTRUCTIONS
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// 6. Update all of the plots any time that a new sample is selected.