/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function App() {
    let url = prompt(
        'EXAMPLE:\n\nhttps://pages.github.com\n\nDEFAULT:\n\nhttps://pages.github.com\n\n\n\nEnter URL here:\n\n'
    );

    url = url === '' ? 'https://pages.github.com' : url;

    fetch(url)
        .then(resp => resp.arrayBuffer())
        .then(buff => {
            const decoder = new TextDecoder('iso-8859-1');
            const text = decoder.decode(buff);
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const allItems = doc.body.querySelectorAll('*');

            for (let i = 0; i < allItems.length; i++) {
                const item = allItems[i];

                if (item.hasAttribute('style')) {
                    let style = item.getAttribute('style');

                    style = style.replace(/font-family[^;]+;?/g, '');

                    item.setAttribute('style', style);
                }
            }

            document.body.innerHTML += doc.body.innerHTML;
        })
        .catch(() =>
            // eslint-disable-next-line quotes
            window.alert("The requested page doesn't support remote fetching.")
        );

    return <></>;
}
