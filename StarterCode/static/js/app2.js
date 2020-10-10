d3.json("samples.json").then(importedData => {
    var data = importedData;

// Get just the "testsubject ids" from the data set
    justtestsubjects = data.names;

// Get just the "samples" from the data set
    justsamples = data.samples;

// Get just the "metadata" from the data set
    justmetadata = data.metadata;

// Pre-Populate data into the Test Subject ID select dropdown list
// Select the d3 input element for the dropdown
    const subjectselect = d3.select("#selDataset");

// Build the Test Subject ID drop down list
    justtestsubjects.forEach(namevalue =>{
      var option = subjectselect.append("option");
      option.text(namevalue);
      option.attr("value",namevalue);
    });

// Build arrays for the primary axes and labels for the bar plot.
// [0] is used because on init() the first subject ID is 0 
    let sampvalues = justsamples[0].sample_values;
    let otuids = justsamples[0].otu_ids;
    let otulabels = justsamples[0].otu_labels;

// Slice the first 10 objects for plotting - bar chart requirement
    sampvalues = sampvalues.slice(0, 10);
    otuids = otuids.slice(0, 10);
    otulabels = otulabels.slice(0,10);

// Format OTU ID string
    let otuidslist = otuids.map(otuid => 'OTU ' + otuid);

// Reverse the arrays to meet Plotly's default requirements
    sampvalues = sampvalues.reverse();
    otuidslist = otuidslist.reverse();
    otulabels = otulabels.reverse();

// Trace for the the bar chart
  var trace = {
    x: sampvalues,
    y: otuidslist,
    text: otulabels,
    type: "bar",
    orientation: "h"
  }
});