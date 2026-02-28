"use client";

import { useState } from "react";

interface Props {
    files: string[];
}

export default function ShowcaseClient({ files }: Props) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filtered = files.filter((f) =>
        f.toLowerCase().includes(search.toLowerCase())
    );

    const nameWithoutExt = (f: string) => f.replace(/\.html$/, "");

    return (
        <main className="min-h-screen bg-[#0e0e0e] text-white font-mono">
            {/* Header */}
            <header className="border-b border-white/10 px-8 py-6 flex items-center justify-between gap-6 sticky top-0 bg-[#0e0e0e]/90 backdrop-blur z-10">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        / showcase
                    </h1>
                    <p className="text-xs text-white/40 mt-0.5">
                        {files.length} prototype{files.length !== 1 ? "s" : ""} in{" "}
                        <span className="text-white/60">public/htmls</span>
                    </p>
                </div>
                <input
                    type="text"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 w-48 transition-colors"
                />
            </header>

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-[#141414] border border-white/10 rounded-lg w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0">
                            <span className="text-sm text-white/60">
                                <span className="text-white">{nameWithoutExt(selected)}</span>
                                .html
                            </span>
                            <div className="flex items-center gap-3">
                                <a
                                    href={`/htmls/${selected}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-3 py-1 rounded"
                                >
                                    別タブで開く ↗
                                </a>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="text-white/40 hover:text-white text-lg leading-none transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        {/* iFrame */}
                        <iframe
                            src={`/htmls/${selected}`}
                            className="flex-1 w-full bg-white"
                            title={selected}
                        />
                    </div>
                </div>
            )}

            {/* Grid */}
            <section className="px-8 py-8">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-white/30 text-sm">
                        {files.length === 0
                            ? "public/htmls にファイルが見つかりません"
                            : "一致するファイルがありません"}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((file, i) => (
                            <Card
                                key={file}
                                file={file}
                                index={i}
                                onPreview={() => setSelected(file)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

function Card({
    file,
    index,
    onPreview,
}: {
    file: string;
    index: number;
    onPreview: () => void;
}) {
    const name = file.replace(/\.html$/, "");
    // Assign a subtle accent color per card for variety
    const accents = [
        "border-t-cyan-500",
        "border-t-violet-500",
        "border-t-amber-500",
        "border-t-emerald-500",
        "border-t-rose-500",
        "border-t-sky-500",
        "border-t-orange-500",
        "border-t-pink-500",
    ];
    const accent = accents[index % accents.length];

    return (
        <div
            className={`group bg-[#141414] border border-white/10 border-t-2 ${accent} rounded-lg overflow-hidden hover:border-white/20 transition-all duration-200 cursor-pointer`}
            onClick={onPreview}
        >
            {/* Preview thumbnail via iframe (pointer-events-none) */}
            <div className="relative h-36 bg-[#1a1a1a] overflow-hidden">
                <iframe
                    src={`/htmls/${file}`}
                    className="absolute top-0 left-0 w-[800px] h-[600px] pointer-events-none"
                    style={{ transform: "scale(0.22)", transformOrigin: "top left" }}
                    loading="lazy"
                    title={`preview-${file}`}
                    tabIndex={-1}
                />
                {/* Overlay for click */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {/* Hover label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                        プレビュー
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="px-4 py-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{name}</p>
                    <p className="text-xs text-white/30 mt-0.5">.html</p>
                </div>
                <a
                    href={`/htmls/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white/30 hover:text-white text-sm transition-colors shrink-0"
                    title="別タブで開く"
                >
                    ↗
                </a>
            </div>
        </div>
    );
}