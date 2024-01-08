/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

/* eslint-env browser */

( function() {
	const LOCAL_STORAGE_KEY = 'CKEDITOR_CS_CONFIG';

	function createDialog() {
		const overlay = document.createElement( 'div' );

		overlay.id = 'overlay';
		overlay.innerHTML = `
<form class="body">
	<h2>Connect CKEditor5 Premium Features</h2>
	<p>If you do not have CKEditor5 license key yet, <a href="https://ckeditor.com/docs/trial/latest/guides/overview.html" target="_blank">see the documentation</a>.</p>
	<div>
		<label for="license-key">CKEditor5 License Key</label>
		<input id="license-key">
	</div>
	<h2>Connect WProofreader</h2>
	<div>
		<label for="wproofreader-service-id">WProofreader serviceId</label>
		<input id="wproofreader-service-id">
	</div>
	<h2>Connect CKEditor Cloud Services</h2>
	<p>If you do not have Cloud Services URLs yet, <a href="https://ckeditor.com/docs/cs/latest/guides/collaboration/quick-start.html" target="_blank">see the documentation</a>.</p>
	<div>
		<label for="upload-url">Upload URL</label>
		<input id="upload-url">
	</div>
	<div>
		<label for="web-socket-url">WebSocket URL</label>
		<input id="web-socket-url">
	</div>
	<div>
		<label for="token-url">Token URL</label>
		<input id="token-url" required>
	</div>
	<div id="additional">
		<p>Use one of the following users to define the user data.</p>
		<div id="user-container"></div>
	</div>
	<div>
		<label for="channel-id">Document ID</label>
		<input id="channel-id" required>
	</div>
	<button id="start" type="submit">Start</button>
</form>`;

		document.body.appendChild( overlay );

		const config = getStoredConfig();

		const licenseKeyInput = document.getElementById( 'license-key' );
		licenseKeyInput.value = config.licenseKey || '';

		const wproofreaderServiceIdInput = document.getElementById( 'wproofreader-service-id' );
		wproofreaderServiceIdInput.value = config.wproofreaderServiceId || '';

		const uploadUrlInput = document.getElementById( 'upload-url' );
		const webSocketUrlInput = document.getElementById( 'web-socket-url' );
		const tokenUrlInput = document.getElementById( 'token-url' );
		const channelIdInput = document.getElementById( 'channel-id' );
		uploadUrlInput.value = config.uploadUrl || '';
		webSocketUrlInput.value = config.webSocketUrl || '';
		tokenUrlInput.value = config.tokenUrl || '';
		channelIdInput.value = config.channelId || uid();

		const additional = document.getElementById( 'additional' );
		const userContainer = document.getElementById( 'user-container' );

		// Create two random users with avatars.
		addUser( {
			id: 'e1',
			name: 'Tom Rowling',
			avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
			role: 'writer'
		} );
		addUser( {
			id: 'e2',
			name: 'Wei Hong',
			avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
			role: 'writer'
		} );

		// Create two random users without avatars.
		addUser( { id: 'e3', name: 'Rani Patel', role: 'writer' } );
		addUser( { id: 'e4', name: 'Henrik Jensen', role: 'commentator' } );

		// Create two anonymous users.
		addUser( { id: uid(), role: 'writer' } );
		addUser( { id: uid(), role: 'reader' } );

		tokenUrlInput.addEventListener( 'input', () => {
			overlay.classList.remove( 'warning' );
			userContainer.querySelectorAll( 'div' ).forEach( div => div.classList.remove( 'active' ) );
			additional.classList.toggle( 'visible', isCloudServicesTokenEndpoint( tokenUrlInput.value ) );
		} );

		// Mark the first user as selected.
		if ( isCloudServicesTokenEndpoint( config.tokenUrl ) ) {
			additional.classList.add( 'visible' );
		}

		return new Promise( resolve => {
			overlay.querySelector( 'form' ).addEventListener( 'submit', event => {
				event.preventDefault();

				config.licenseKey = licenseKeyInput.value;

				config.wproofreaderServiceId = wproofreaderServiceIdInput.value;

				// Detect if the token contains user data.
				if ( isCloudServicesTokenEndpoint( tokenUrlInput.value ) && !tokenUrlInput.value.includes( '?' ) ) {
					overlay.classList.add( 'warning' );

					return;
				}

				updateDocIdInUrl( channelIdInput.value );

				config.tokenUrl = tokenUrlInput.value;
				config.uploadUrl = uploadUrlInput.value;
				config.webSocketUrl = webSocketUrlInput.value;
				config.channelId = channelIdInput.value;

				overlay.remove();
				storeConfig( config );
				resolve( config );
			} );
		} );
	}

	function getStoredConfig() {
		return JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) || '{}' );
	}

	function storeConfig( config ) {
		localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( config ) );
	}

	function addUser( options ) {
		const userContainer = document.getElementById( 'user-container' );
		const tokenUrlInput = document.getElementById( 'token-url' );
		const overlayEl = document.getElementById( 'overlay' );

		const userDiv = document.createElement( 'div' );
		userDiv.innerText = options.name || '(anonymous)';

		const userRoleSpan = document.createElement( 'span' );
		userRoleSpan.innerText = options.role;
		userRoleSpan.classList.add( 'role' );
		userDiv.appendChild( userRoleSpan );

		if ( options.avatar ) {
			const img = document.createElement( 'img' );

			img.src = options.avatar;
			userDiv.prepend( img );
		} else {
		// Handle cases without avatar to display them properly in the users list.
			const pseudoAvatar = document.createElement( 'span' );
			pseudoAvatar.classList.add( 'pseudo-avatar' );

			if ( !options.name ) {
				pseudoAvatar.classList.add( 'anonymous' );
			} else {
				pseudoAvatar.textContent = getUserInitials( options.name );
			}

			userDiv.prepend( pseudoAvatar );
		}

		userDiv.addEventListener( 'click', () => {
			tokenUrlInput.value = `${ getRawTokenUrl( tokenUrlInput.value ) }?` + Object.keys( options )
				.filter( key => options[ key ] )
				.map( key => {
					if ( key === 'role' ) {
						return `${ key }=${ options[ key ] }`;
					}

					return `user.${ key }=${ options[ key ] }`;
				} )
				.join( '&' );

			overlayEl.classList.remove( 'warning' );
			userContainer.querySelectorAll( 'div' ).forEach( div => div.classList.remove( 'active' ) );
			userDiv.classList.add( 'active' );
		} );

		userContainer.appendChild( userDiv );
	}

	function getUserInitials( name ) {
		return name.split( ' ', 2 ).map( part => part.charAt( 0 ) ).join( '' ).toUpperCase();
	}

	function updateDocIdInUrl( docId ) {
		const url = `${ window.location.href.split( '?' )[ 0 ] }?docId=${ docId }`;

		window.history.replaceState( {}, document.title, url );
	}

	function isCloudServicesTokenEndpoint( tokenUrl ) {
		return /cke-cs[\w-]*\.com\/token\/dev/.test( tokenUrl );
	}

	function getRawTokenUrl( url ) {
		if ( isCloudServicesTokenEndpoint( url ) ) {
			return url.split( '?' )[ 0 ];
		}

		return url;
	}

	function uid() {
		let uuid = 'e'; // Make sure that id does not start with number.

		for ( let i = 0; i < 8; i++ ) {
			uuid += Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 );
		}

		return uuid;
	}

	window.createDialog = createDialog;
}() );
