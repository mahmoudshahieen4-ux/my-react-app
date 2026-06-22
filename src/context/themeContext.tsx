import React, { createContext, useContext, useEffect, useState } from "react";

// تحديد أنواع المظهر المتاحة
type Theme = "dark" | "light" | "system";

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

// 1. إنشاء الـ Context ببيانات افتراضية فارغة
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. إنشاء الـ Provider الذي سيحيط بالتطبيق كاملاً
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // قراءة الثيم المخزن سابقاً أو جعل "system" هو الافتراضي
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem("app-theme") as Theme) || "system";
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // تنظيف الكلاسات القديمة
        root.classList.remove("light", "dark");

        // إذا اختار المستخدم "حسب النظام"
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }

        // إذا اختار وضع محدد (dark أو light)
        root.classList.add(theme);
    }, [theme]);

    // دالة لتحديث الثيم وحفظه في الـ localStorage
    const updateTheme = (newTheme: Theme) => {
        localStorage.setItem("app-theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Hook مخصص لطلب الثيم وتغييره بسهولة في أي مكون لاحقاً
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}