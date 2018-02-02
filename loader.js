define(['ojs/ojcore', 'text!./qr-scanner.html', './qr-scanner', 'text!./qr-scanner.json', 'css!./styles', 'ojs/ojcomposite'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('qr-scanner', {
      view: {inline: view}, 
      viewModel: {inline: viewModel}, 
      metadata: {inline: JSON.parse(metadata)}
    });
  }
);