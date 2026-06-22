import {
    // Twitter,
    // Youtube,
    // Instagram,
    Globe,
    BookOpen,
    Tv,
    ExternalLink
} from 'lucide-react';

export default function FlowedItems() {
    return (
        // الحاوية الكبرى ثابتة وتغطي الشاشة بدون التسبب في مشاكل التمرير
        <div className="fixed inset-0 pointer-events-none z-50">

            {/* صندوق الأيقونات في أسفل اليسار - تفعيل الأحداث فيه فقط */}
            <div className="absolute bottom-6 left-6 pointer-events-auto">
                <ul className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-lg">

                    {/* <li>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 block">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200 block">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200 block">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </li> */}

                    <li>
                        <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 block">
                            <Globe className="w-5 h-5" />
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200 block">
                            <BookOpen className="w-5 h-5" />
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 block">
                            <Tv className="w-5 h-5" />
                        </a>
                    </li>

                    <li>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 block">
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </li>

                </ul>
            </div>

        </div>
    );
}