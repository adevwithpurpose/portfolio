#!/home/linuxbrew/.linuxbrew/bin/python3.14
from yt_transcript_api import YouTubeTranscriptApi
import os, sys

videos = [
    ('tkwsFrQ5kGI', 'X_clients_2025'),
    ('47h6E_MJF6k', 'X_twitter_step_by_step'),
    ('gdSwAOaDAqA', 'freelance_clients_2025'),
    ('8n8L_9zxjoU', 'clients_ultimate_guide'),
    ('DA6iv9eizEg', 'freelance_AI_2025'),
]

outdir = '/home/safeer08/.openclaw/workspace/play_zone/client-hunting/research/youtube-transcripts'
os.makedirs(outdir, exist_ok=True)

for vid, name in videos:
    try:
        print(f'Fetching {vid} ({name})...', flush=True)
        transcript = YouTubeTranscriptApi.get_transcript(vid)
        text = ' '.join([t['text'] for t in transcript])
        with open(f'{outdir}/{name}.txt', 'w') as f:
            f.write(text)
        print(f'  -> {len(text)} chars saved', flush=True)
    except Exception as e:
        print(f'  -> ERROR: {e}', flush=True)
