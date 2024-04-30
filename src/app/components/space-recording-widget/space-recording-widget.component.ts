import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaTypes, SpaceRecording } from '@models/media.model';

@Component({
	selector: 'cuentoneta-space-recording-widget',
	standalone: true,
	imports: [CommonModule, NgOptimizedImage],
	template: `
		<a [href]="spaceUrl" target="_blank">
			<section class="spaces-card inter-body-base grid grid-rows-3-auto rounded-lg p-4 text-white">
				<div class="flex items-center justify-between text-base">
					<div class="spaces-host flex gap-2.5">
						<img
							[ngSrc]="media().data.tweetBy.profileImage"
							class="rounded-full border-1 border-solid border-white"
							width="24"
							height="24"
						/>
						<div class="font-bold">{{ media().data.tweetBy.fullName }}</div>
						<span class="flex items-center rounded bg-[#fff4] px-1 py-0.5 text-sm">Anfitrión</span>
					</div>
					<div class="space-recording-data hidden gap-2.5 md:flex">
						<div class="font-bold">{{ media().data.createdAt | date: 'MMMM d, YYYY' }}</div>
						<div class="spaces-duration">{{ media().data.duration }}</div>
					</div>
				</div>
				<h3 class="my-4 text-xl font-semibold text-white">
					{{ media().title }}
				</h3>
				<div class="rounded-3xl bg-[#fff4] p-2.5 text-center text-base font-bold no-underline hover:bg-[#1114]">
					Reproducir Grabación en X
				</div>
			</section>
		</a>
	`,
	styles: `
		:host {
			font-family: sans-serif;
		}
		
		.spaces-card {
			background-image: linear-gradient(60deg, hsl(230, 100 * 1%, 50 * 1%) -15%, hsl(260, 100 * 1%, 60 * 1%) 100%);
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceRecordingWidgetComponent {
	media = input.required({
		transform: (media: MediaTypes) => media as SpaceRecording,
	});

	public spaceUrl: string = '';

	constructor() {
		effect(() => {
			this.spaceUrl = this.media().data.entities.urls[0];
		});
	}
}
