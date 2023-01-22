declare type WithRouterProps = {
	location: import('react-router-dom').Location;
	params: Readonly<import('react-router-dom').Params<string>>;
	navigate: import('react-router-dom').NavigateFunction;
}