# ebrains-yt-video

Displays an overlay warning the user about Youtube/Google privacy if s.he loads/watches the video. Clicking on "watch video" button makes the embedded iframe created in the document

## Attributes

| name  | description                           | mandatory |
| ----- | ------------------------------------- | --------- |
| url   | "Embed" youtube video url             | x         |
| title | Video title                           |           |
| cover | URL to image used as background cover |           |

## Style

CSS custom properties

| property                                 | description                                               | default                            |
| ---------------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| --ebrains-yt-video-overlay-fgcolor       | Overlay text color                                        | #FFF                               |
| --ebrains-yt-video-overlay-bgcolor       | Overlay background color. If opaque, cover is not visible | rgba(0, 0, 0, .7)                  |
| --ebrains-yt-video-overlay-gradient-from | Overlay vertical gradient start color                     | --ebrains-yt-video-overlay-bgcolor |
| --ebrains-yt-video-overlay-gradient-to   | Overlay vertical gradient end color                       | --ebrains-yt-video-overlay-bgcolor |
| --ebrains-yt-video-overlay-a             | Link color                                                | #82c558                            |
| --ebrains-yt-video-overlay-a-hover       | Link hover color                                          | #82c558                            |
| --ebrains-yt-video-overlay-a-active      | Link active color                                         | #82c558                            |
| --ebrains-yt-video-overlay-a-visited     | Link visited color                                        | #82c558                            |

## Usage

1. Reference component using the right version.

```
<script src="https://cdn.jsdelivr.net/gh/HumanBrainProject/ebrains-webcomponents@{version}/ebrains-yt-video/ebrains-yt-video.js"></script>
```

2. Use in HTML

```
<ebrains-yt-video
	url="https://www.youtube.com/embed/lyQfZZiBQVk?autoplay=1"
	cover="https://strapi-prod.sos-ch-dk-2.exo.io/ebrains_ssd_call_ebrains_website_3a68136980.jpg">
</ebrains-yt-video>
```

## ?????? Warning

You have to style ebrains-yt-video on your side. If you don't define css width and height properties, component should be not visible.
