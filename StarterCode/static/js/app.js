// per HB, pull data in to console.log it, reference where it lives in reference to the .html file
// Use the D3 library to read in `samples.json`
// https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js
d3.json('samples.json').then(data => {
  console.log(data);

// Get "metadata" from the data
  var metadata = data.metadata;
  console.log(metadata);
  
// Get test subject "ids" from the data
  var names = data.names;
  console.log(names);

// Get the "samples" from the data
  var samples = data.samples;
  console.log(samples);

// populate data into the Test Subject ID dropdown list
// Select the d3 input element for the dropdown
  const selection = d3.select("#selDataset");

// Build the Test Subject ID drop down list
  names.forEach(namevalue =>{
    var option = selection.append("option");
    option.text(namevalue);
    option.attr("value", namevalue);
  });

// for the Bar
  // let smpl = data.samples[0].samples_values;
  // let ids = data.samples[0].otu_ids;
  // let lbls = data.samples[0].otu_labels;

  // slicedSmpl = smpl.slice(0,10);
  // slicedIds = ids.slice(0,10);
  // slicedLbls = lbls.slice(0,10);

// reverseSlice = sliced.reverse();

// Format OTU ID string
  // let otuidslist = slicedIds.map(otuid => 'OTU ' + otuid);

  var trace = {
    // x: data.samples[0].sample_values,
    // x: sliced.samples_values,
    // x: slicedSmpl.sample_values,
    x: slicedSmpl,
    // y: data.samples[0].otu_ids,
    // y: sliced[0].otu_ids,
    // y: slicedIds.otu_ids,
    y: otuidslist,
    type: 'bar',
    // text: data.samples[0].otu_labels,
    // text: sliced[0].otu_labels,
    // text: slicedLbls.otu_labels,
    text: slicedLbls,
    orientation: 'h'
  };

  var data = [trace];

  Plotly.newPlot('bar', data);

// for the bubble

// var plotData = `/samples/${sample}`;
// d3.json(plotData).then(function (data) {

// // build a Bubble Chart using the sample data
  var x_axis = plotData.data.otu_ids;
  var y_axis = plotData.data.sample_values;
  var size = plotData.data.sample_values;
  var color = plotData.data.otu_ids;
  var texts = plotData.data.otu_labels;

  var bubble = {
    x: x_axis,
    y: y_axis,
    text: texts,
    mode: `markers`,
    marker: {
      size: size, 
      color: color
    }
  };
    
  var data = [bubble];

  var layout = {
    xaxis: {title: "OTU ID"}, 
    title: "Belly Button Bacteria"
  };

  Plotly.newPlot('bubble', data, layout);

}).catch(error => console.log(error));

// ---------


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
// the dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.
// The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.
// ## Step 1: Plotly
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.

//   3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// 6. Update all of the plots any time that a new sample is selected.
// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// ## Deployment
// * Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.
// * Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md file

// ## Hints
// * Use `console.log` inside of your JavaScript code to see what your data looks like at each step.
// * Refer to the [Plotly.js documentation](https://plot.ly/javascript/) when building the plots.