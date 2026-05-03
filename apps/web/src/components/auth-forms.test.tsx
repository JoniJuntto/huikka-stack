import { beforeAll, describe, expect, mock, test } from "bun:test";
import { render, screen } from "@testing-library/react";

const useSessionMock = mock(() => ({
	data: null,
	isPending: false,
}));

beforeAll(() => {
	mock.module("@/lib/auth-client", () => ({
		authClient: {
			signIn: {
				email: async () => undefined,
			},
			signUp: {
				email: async () => undefined,
			},
			useSession: useSessionMock,
		},
	}));

	mock.module("@tanstack/react-router", () => ({
		useNavigate: () => () => undefined,
	}));
});

describe("auth form rendering", () => {
	test("sign in form exposes email and password fields", async () => {
		const { default: SignInForm } = await import("./sign-in-form");

		render(<SignInForm onSwitchToSignUp={() => undefined} />);

		expect(screen.getByRole("heading", { name: "Welcome Back" })).toBeDefined();
		expect(screen.getByLabelText("Email")).toBeDefined();
		expect(screen.getByLabelText("Password")).toBeDefined();
		expect(screen.getByRole("button", { name: "Sign In" })).toBeDefined();
	});

	test("sign up form exposes name, email, and password fields", async () => {
		const { default: SignUpForm } = await import("./sign-up-form");

		render(<SignUpForm onSwitchToSignIn={() => undefined} />);

		expect(
			screen.getByRole("heading", { name: "Create Account" }),
		).toBeDefined();
		expect(screen.getByLabelText("Name")).toBeDefined();
		expect(screen.getByLabelText("Email")).toBeDefined();
		expect(screen.getByLabelText("Password")).toBeDefined();
		expect(screen.getByRole("button", { name: "Sign Up" })).toBeDefined();
	});
});
