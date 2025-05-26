import { Suspense } from "react";
import RecoverCompletePage from "./RecoveryClient";

export default function VerificationPage() {
	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Verification Page</h1>
			<Suspense fallback={<div>Loading verification...</div>}>
				<RecoverCompletePage />
			</Suspense>
		</div>
	);
}
