export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-white py-12 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center bg-zinc-950">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">bufferworks</h2>
                    <p className="text-zinc-500 text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="flex gap-8">
                    <a href="https://www.instagram.com/bufferworks.in" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Instagram</a>
                    <a href="https://www.linkedin.com/company/bufferworks/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com/bufferworksin" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
