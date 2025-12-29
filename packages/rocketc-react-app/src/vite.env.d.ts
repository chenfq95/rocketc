declare module '*.svg?react' {
	import { SVGProps } from 'react';
	const content: JSX.Element<SVGProps<SVGSVGElement>>;
	export default content;
}
