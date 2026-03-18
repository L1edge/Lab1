// ==========================================
// 1. ОБРОБКА ПОМИЛОК (ERROR HANDLING)
// Створюємо кастомні типи помилок для кожної фігури
// ==========================================

export class FigureInitError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FigureInitError";
    }
}

export class LineInitError extends FigureInitError {
    constructor(message: string = "Початкова та кінцева точки лінії не можуть співпадати.") {
        super(message);
        this.name = "LineInitError";
    }
}

export class TriangleInitError extends FigureInitError {
    constructor(message: string = "Три точки не можуть утворювати трикутник (лежать на одній прямій).") {
        super(message);
        this.name = "TriangleInitError";
    }
}

export class QuadrangleInitError extends FigureInitError {
    constructor(message: string = "Неможливо створити чотирикутник з заданих точок.") {
        super(message);
        this.name = "QuadrangleInitError";
    }
}

export class MathMethodError extends Error {
    constructor(message: string = "Математична помилка під час виконання методу.") {
        super(message);
        this.name = "MathMethodError";
    }
}


// --- Базові сутності ---

export class Point {
    constructor(public x: number, public y: number) {}
    static distance(p1: Point, p2: Point): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
}

export class Vector {
    public dx: number; public dy: number;
    constructor(p1: Point, p2: Point) {
        this.dx = p2.x - p1.x; this.dy = p2.y - p1.y;
    }
    get module(): number { return Math.sqrt(this.dx * this.dx + this.dy * this.dy); }
}

export enum FigureType {
    Unknown = "Невідома", Line = "Лінія", Triangle = "Трикутник", Quadrangle = "Чотирикутник"
}

export abstract class Figure {
    constructor(public points: Point[], public name?: string) {}
    abstract get area(): number;
    abstract get perimeter(): number;
    abstract get figureType(): FigureType;
    abstract get details(): string;
    get description(): string { return `${this.name} (${this.details})`; }
}

// --- Реалізація з генерацією помилок (Throw) ---

export class Line extends Figure {
    constructor(p1: Point, p2: Point, name?: string) { 
        super([p1, p2], name); 
        // ПЕРЕВІРКА: Якщо точки однакові, викидаємо помилку
        if (p1.x === p2.x && p1.y === p2.y) {
            throw new LineInitError();
        }
    }
    get figureType() { return FigureType.Line; }
    get length() { return Point.distance(this.points[0], this.points[1]); }
    get perimeter() { return this.length; }
    get area() { return 0; }
    get details() { return `Довжина: ${this.length.toFixed(2)}`; }
}

export class Triangle extends Figure {
    constructor(p1: Point, p2: Point, p3: Point, name?: string) { 
        super([p1, p2, p3], name); 
        // ПЕРЕВІРКА: Якщо площа == 0 (точки на одній прямій), викидаємо помилку
        if (this.area <= 0.001) {
            throw new TriangleInitError();
        }
    }
    get figureType() { return FigureType.Triangle; }
    private get sides() {
        return [Point.distance(this.points[0], this.points[1]), Point.distance(this.points[1], this.points[2]), Point.distance(this.points[2], this.points[0])];
    }
    get perimeter() { return this.sides.reduce((a, b) => a + b, 0); }
    get area() {
        const s = this.perimeter / 2;
        const [a, b, c] = this.sides;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    get details() { return "Трикутник"; }
}

export class Quadrangle extends Figure {
    constructor(p1: Point, p2: Point, p3: Point, p4: Point, name?: string) { 
        super([p1, p2, p3, p4], name); 
        // ПЕРЕВІРКА: Якщо площа == 0, це не чотирикутник
        if (this.area <= 0.001) {
            throw new QuadrangleInitError();
        }
    }
    get figureType() { return FigureType.Quadrangle; }
    protected get sides() {
        return [Point.distance(this.points[0], this.points[1]), Point.distance(this.points[1], this.points[2]), Point.distance(this.points[2], this.points[3]), Point.distance(this.points[3], this.points[0])];
    }
    get perimeter() { return this.sides.reduce((a, b) => a + b, 0); }
    get area() {
        const p = this.points;
        let sum1 = 0, sum2 = 0;
        for (let i = 0; i < 4; i++) {
            sum1 += p[i].x * p[(i + 1) % 4].y;
            sum2 += p[i].y * p[(i + 1) % 4].x;
        }
        return Math.abs(sum1 - sum2) / 2;
    }
    get details() { return "Довільний чотирикутник"; }
}

export class Rectangle extends Quadrangle { get details() { return "Прямокутник"; } }
export class Rhombus extends Quadrangle { get details() { return "Ромб"; } }
export class Square extends Quadrangle { get details() { return "Квадрат"; } }

// --- Типи для Замкнень та Делегатів ---

export type StringStats = { longest: string; shortest: string; largest: string; smallest: string; };
export type StatsClosure = (result: StringStats) => void;
export interface MathDelegate {
    didFindStringRepresentation(description: string, type: 'longest' | 'shortest' | 'largest' | 'smallest'): void;
}

// ==========================================
// 2. УНІВЕРСАЛЬНИЙ ШАБЛОН (GENERICS)
// Додаємо <T extends Figure> до класу Mathematics
// ==========================================

export class Mathematics<T extends Figure> {
    private _figures: T[] = [];
    private initClosure?: StatsClosure;
    public delegate?: MathDelegate;

    constructor(closure?: StatsClosure) { this.initClosure = closure; }

    addFigure(f: T) { this._figures.push(f); }
    get figures() { return this._figures; }
    
    get maxAreaFigure(): T | null { return this.find((a, b) => a.area > b.area); }
    get minAreaFigure(): T | null { return this.find((a, b) => a.area < b.area); }
    get maxPerimeterFigure(): T | null { return this.find((a, b) => a.perimeter > b.perimeter); }
    get minPerimeterFigure(): T | null { return this.find((a, b) => a.perimeter < b.perimeter); }

    private find(predicate: (a: T, b: T) => boolean): T | null {
        if (this._figures.length === 0) return null;
        return this._figures.reduce((prev, curr) => predicate(prev, curr) ? prev : curr);
    }

    // Допоміжний метод З ОБРОБКОЮ ПОМИЛОК
    private calculateStats(): StringStats {
        if (this._figures.length === 0) {
            // КИДАЄМО ПОМИЛКУ МЕТОДУ, якщо масив порожній
            throw new MathMethodError("Неможливо знайти статистику рядків: список фігур порожній!");
        }

        const descriptions = this._figures.map(f => f.description);
        const longest = descriptions.reduce((a, b) => a.length >= b.length ? a : b);
        const shortest = descriptions.reduce((a, b) => a.length <= b.length ? a : b);
        const largest = descriptions.reduce((a, b) => a >= b ? a : b);
        const smallest = descriptions.reduce((a, b) => a <= b ? a : b);

        return { longest, shortest, largest, smallest };
    }

    public analyzeAsync(callback: StatsClosure) {
        setTimeout(() => {
            try {
                // Використовуємо TRY-CATCH всередині
                const stats = this.calculateStats();
                callback(stats);
                this.delegate?.didFindStringRepresentation(stats.longest, 'longest');
            } catch (error) {
                console.error("Помилка в асинхронному методі:", error);
                // В реальному коді тут би викликався closure з помилкою
            }
        }, 1500);
    }

    // Цей метод прокидає помилку нагору (туди, де його викликали)
    public analyzeSync(callback?: StatsClosure) {
        const stats = this.calculateStats(); // Може викинути MathMethodError
        if (callback) callback(stats);
        if (this.initClosure) this.initClosure(stats);
        this.delegate?.didFindStringRepresentation(stats.shortest, 'shortest');
    }
}