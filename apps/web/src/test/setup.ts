import { afterEach, mock } from "bun:test";
import { JSDOM } from "jsdom";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");

Object.assign(globalThis, {
	document: window.document,
	Event: window.Event,
	HTMLElement: window.HTMLElement,
	HTMLInputElement: window.HTMLInputElement,
	HTMLTextAreaElement: window.HTMLTextAreaElement,
	IS_REACT_ACT_ENVIRONMENT: true,
	MouseEvent: window.MouseEvent,
	Node: window.Node,
	navigator: window.navigator,
	window,
});

window.requestAnimationFrame = (callback: FrameRequestCallback) => {
	return setTimeout(callback, 0);
};

mock.module("sonner", () => ({
	toast: {
		error: () => undefined,
		success: () => undefined,
	},
}));

afterEach(() => {
	void import("@testing-library/react").then(({ cleanup }) => {
		cleanup();
	});
});
