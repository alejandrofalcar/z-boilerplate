import { authClient, signIn, useSession } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

export default function Home() {
	const hello = trpc.hello.useQuery({ text: "client" });
	const navigation = useRouter();
	const { data: session } = useSession();
	if (!hello.data) {
		return <div>Loading...</div>;
	}

	console.log(session);

	return (
		<div>
			{!session?.user ? (
				<button
					type="button"
					onClick={async () => {
						await signIn.social({
							provider: "google",
						});
					}}
				>
					Sign in
				</button>
			) : (
				<button
					type="button"
					onClick={async () => {
						await authClient.signOut();
						navigation.reload();
					}}
				>
					Sign out
				</button>
			)}
			<p>
				{hello.data.greeting} {session?.user?.name}
			</p>
		</div>
	);
}
