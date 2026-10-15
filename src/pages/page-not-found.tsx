import { Link } from "react-router-dom";

import PageMetadata from "../components/Common/PageMetadata";

function PageNotFound() {
  return (
    <>
      <PageMetadata
        title="Page Not Found (404) — SwiftCart"
        description="The page you're looking for could not be found. Return to SwiftCart's homepage to continue shopping."
      />

      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-7xl font-black text-orange-500">404</p>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Page Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
