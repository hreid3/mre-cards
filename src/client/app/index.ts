/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this Index. All the logic goes here.
 */
export default class App {
	private root: MRE.Actor = null;
	private text: MRE.Actor = null;
	private cardTable: MRE.Actor = null;
	private assets: MRE.AssetContainer;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the Index.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		this.root = MRE.Actor.Create(this.context, { actor: { name: 'Root' }});
		await this.loadCardTable();
	}

	private async loadCardTable() {
		// Load a glTF model before we use it
		const cardTableData = await this.assets.loadGltf('card-table-4.glb', "mesh");

		// spawn a copy of the glTF model
		this.cardTable = MRE.Actor.CreateFromPrefab(this.context, {
			// using the data we loaded earlier
			firstPrefabFrom: cardTableData,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Card Table',
				// Parent the glTF model to the text actor, so the transform is relative to the root
				parentId: this.root.id,
				transform: {
					local: {
						position: { x: .30, y: 0, z: .75 },
						scale: { x: 1.0, y: 1.0, z: 1.0 }
					}
				}
			}
		});
	}
}
