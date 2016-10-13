var SampleModule = function( $ ) {
	this.$ = $;
}

SampleModule.prototype.ready = function () {
	console.log( '...sampleModule is ready...' );
	
	$('body').append('<p class="small" align="center" style="margin-top: -50px;"><i class="fa fa-check"></i> sampleModule is ready</p>');
};

module.exports = SampleModule;
