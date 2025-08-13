export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white text-center py-6 mt-20">
         <p className="text-white-300 mb-2">
              Real Estate photographer serving Seattle, WA and surrounding areas
            </p>
        <p>&copy; {new Date().getFullYear()} Stephanie Kaye Photography | Seattle, WA</p>
      </footer>
    );
  }