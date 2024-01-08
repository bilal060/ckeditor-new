const initialData = `
<h2 style="text-align:center;">The Flavorful Tuscany Meetup</h2>
<h3 style="text-align:center;">Welcome letter</h3>
<p>Dear Guest,</p>
<p>We are delighted to welcome you to the annual <em>Flavorful Tuscany Meetup</em> and hope you will enjoy the programme as well as your stay at the <a href="https://ckeditor.com">Bilancino Hotel</a>.</p>
<p>Please find below the full schedule of the event.</p>
<figure class="table">
	<table>
		<thead>
			<tr>
				<th colspan="2"><span>Saturday, July 14</span></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><span>9:30 AM - 11:30 AM</span></td>
				<td><span><strong>Americano vs. Brewed</strong> - “know your coffee” with:</span>
					<ul>
						<li>Giulia Bianchi</li>
						<li>Stefano Garau</li>
						<li>Giuseppe Russo</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td><span>1:00 PM - 3:00 PM</span></td>
				<td>
					<p><strong>Pappardelle al pomodoro</strong> - live cooking</p>
					<p>Incorporate the freshest ingredients<br>with Rita Fresco</p>
				</td>
			</tr>
			<tr>
				<td><span>5:00 PM - 8:00 PM</span></td>
				<td>
					<p><strong>Tuscan vineyards at a glance</strong> - wine-tasting <br> with Frederico Riscoli</p>
				</td>
			</tr>
		</tbody>
	</table>
</figure>
<blockquote>
	<p>
		The annual Flavorful Tuscany meetups are always a culinary discovery.
		You get the best of Tuscan flavors during an intense one-day stay at one of the top hotels of the region.
		All the sessions are lead by top chefs passionate about their profession.
		I would certainly recommend to save the date in your calendar for this one!
	</p>
	<p>Angelina Calvino, food journalist</p>
</blockquote>
<p>Please arrive at the <a href="https://ckeditor.com">Bilancino Hotel</a> reception desk at least half an hour earlier to make sure that the
	registration process goes as smoothly as possible.
</p>
<p>We look forward to welcoming you to the event.</p>
<p><strong>Victoria Valc</strong> - Event Manager</p>`;

let revertOriginalButtonTimeoutId = null;

const loaderElement = document.querySelector( '.loader' );
const loaderElementContainer = loaderElement.parentNode;

createDialog().then( config => {
	return ClassicEditor
		.create( document.querySelector( '.collaboration-demo__editable' ), {
			licenseKey: config.licenseKey,
			initialData,
			cloudServices: {
				tokenUrl: config.tokenUrl,
				uploadUrl: config.uploadUrl,
				webSocketUrl: config.webSocketUrl
			},
			collaboration: {
				channelId: config.channelId
			},
			revisionHistory: {
				editorContainer: document.querySelector( '.editor-container' ),
				viewerContainer: document.querySelector( '.revision-viewer-container' ),
				viewerEditorElement: document.querySelector( '.revision-viewer-editor' ),
				viewerSidebarContainer: document.querySelector( '.revision-viewer-sidebar' )
			},
			sidebar: {
				container: document.querySelector( '.sidebar' )
			}
		} )
		.then( editor => {
			window.editor = editor;

			loaderElement.classList.add( 'fadeout' );

			setTimeout( () => {
				document.querySelector( '.collaboration-demo' ).classList.add( 'collaboration-demo--ready' );
				loaderElementContainer.removeChild( loaderElement );
			}, 200 );

			enableShareButton();

			// Prevent closing the tab when any action is pending.
			editor.ui.view.listenTo( window, 'beforeunload', ( evt, domEvt ) => {
				if ( editor.plugins.get( 'PendingActions' ).hasAny ) {
					domEvt.preventDefault();
					domEvt.returnValue = true;
				}
			} );

			function enableShareButton() {
				const triggerElement = document.querySelector( '.collaboration-demo__share .btn' );
				const inputElement = document.getElementById( 'demo-collaboration-url' );

				inputElement.value = window.location;
				inputElement.addEventListener( 'click', () => inputElement.select() );
				triggerElement.addEventListener( 'click', () => copyFromInput( inputElement, triggerElement ) );
			}

			function copyFromInput( inputElement, triggerElement ) {
				inputElement.select();
				document.execCommand( 'copy' );

				triggerElement.textContent = 'Copied!';
				clearTimeout( revertOriginalButtonTimeoutId );

				revertOriginalButtonTimeoutId = setTimeout( () => {
					triggerElement.textContent = 'Copy URL';
				}, 1500 );
			}
		} )
		.catch( handleSampleError );
} );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "g7juk1pg933e-fo3ivh1nhi1e" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
