import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q1",
    title: "Discount engine",
    difficulty: "easy",
    category: "behavioral",
    codeSnippet: `public interface IDiscountStrategy
{
    decimal Apply(decimal total);
}

public class Cart
{
    private IDiscountStrategy _strategy;

    public Cart(IDiscountStrategy strategy)
    {
        _strategy = strategy;
    }

    public void SetStrategy(IDiscountStrategy strategy)
    {
        _strategy = strategy;
    }

    public decimal Checkout(decimal total)
    {
        return _strategy.Apply(total);
    }
}

public class HolidayDiscount : IDiscountStrategy
{
    public decimal Apply(decimal total) => total * 0.85m;
}

public class NoDiscount : IDiscountStrategy
{
    public decimal Apply(decimal total) => total;
}`,
    hintsEn: [
      "Behavior changes at runtime by swapping objects.",
      "The client delegates a calculation to a pluggable policy.",
      "Concrete implementations share the same interface."
    ],
    hintsTr: [
      "Davranış, nesneler değiştirildiğinde çalışma zamanında değişir.",
      "İstemci, hesaplamayı tak-çıkar bir policy'ye devreder.",
      "Somut uygulamalar aynı interface'i paylaşır."
    ],
    options: ["Strategy", "State", "Template Method", "Singleton"],
    correctOption: "Strategy",
    explanationEn:
      "The cart delegates the discount calculation to interchangeable strategy objects, allowing behavior to change without modifying the cart itself.",
    explanationTr:
      "Cart, indirim hesaplamasını değiştirilebilir Strategy nesnelerine devrederek davranışın Cart'ı değiştirmeden değişmesini sağlar.",
    whyNotOthers: [
      "State changes internal state transitions, but here there is no state machine driving behavior.",
      "Template Method relies on inheritance and overridable steps, not interchangeable objects.",
      "Singleton is about a single shared instance, which is not relevant here."
    ]
  },
  {
    id: "q2",
    title: "Order status alerts",
    difficulty: "medium",
    category: "behavioral",
    codeSnippet: `public interface IOrderObserver
{
    void OnStatusChanged(string status);
}

public class Order
{
    private readonly List<IOrderObserver> _observers = new();
    private string _status = "Created";

    public void Subscribe(IOrderObserver observer) => _observers.Add(observer);
    public void Unsubscribe(IOrderObserver observer) => _observers.Remove(observer);

    public void UpdateStatus(string status)
    {
        _status = status;
        foreach (var observer in _observers)
        {
            observer.OnStatusChanged(_status);
        }
    }
}

public class EmailNotifier : IOrderObserver
{
    public void OnStatusChanged(string status)
    {
        Console.WriteLine($"Email: order is {status}");
    }
}`,
    hintsEn: [
      "Many listeners react to a single subject’s state changes.",
      "Observers can be added or removed at runtime.",
      "The subject does not know concrete observer types."
    ],
    hintsTr: [
      "Bir subject'in durum değişikliklerine birçok listener tepki verir.",
      "Observer'lar çalışma zamanında eklenip kaldırılabilir.",
      "Subject, somut observer türlerini bilmez."
    ],
    options: ["Observer", "Mediator", "Command", "Proxy"],
    correctOption: "Observer",
    explanationEn:
      "The order notifies registered observers whenever its status changes, decoupling the subject from concrete listeners.",
    explanationTr:
      "Order, durum değiştiğinde kayıtlı Observer'ları bildirir; subject ile somut dinleyiciler arasındaki bağı gevşetir.",
    whyNotOthers: [
      "Mediator centralizes complex interactions, but here observers are directly notified.",
      "Command encapsulates requests, not event subscriptions.",
      "Proxy controls access to another object rather than broadcasting updates."
    ]
  },
  {
    id: "q3",
    title: "Telemetry stream",
    difficulty: "medium",
    category: "structural",
    codeSnippet: `public interface IDataStream
{
    void Write(string payload);
}

public class CoreStream : IDataStream
{
    public void Write(string payload)
    {
        Console.WriteLine($"Sending: {payload}");
    }
}

public abstract class StreamDecorator : IDataStream
{
    protected readonly IDataStream Inner;

    protected StreamDecorator(IDataStream inner)
    {
        Inner = inner;
    }

    public virtual void Write(string payload) => Inner.Write(payload);
}

public class LoggingStream : StreamDecorator
{
    public LoggingStream(IDataStream inner) : base(inner) { }

    public override void Write(string payload)
    {
        Console.WriteLine("Log before send");
        base.Write(payload);
    }
}`,
    hintsEn: [
      "Adds behavior without changing the original component.",
      "Wraps an object that implements the same interface.",
      "Multiple wrappers can be stacked."
    ],
    hintsTr: [
      "Orijinal component'i değiştirmeden davranış ekler.",
      "Aynı interface'i uygulayan bir nesneyi sarar.",
      "Birden çok wrapper üst üste eklenebilir."
    ],
    options: ["Decorator", "Adapter", "Facade", "Proxy"],
    correctOption: "Decorator",
    explanationEn:
      "The stream decorator wraps the core stream and adds logging while keeping the same interface.",
    explanationTr:
      "Stream decorator, core stream'i sarar ve logging eklerken aynı interface'i korur.",
    whyNotOthers: [
      "Adapter changes interfaces, but here the interface stays the same.",
      "Facade provides a simplified API, not stacked wrappers.",
      "Proxy controls access rather than layering new behavior."
    ]
  },
  {
    id: "q4",
    title: "Document factory",
    difficulty: "easy",
    category: "creational",
    codeSnippet: `public abstract class DocumentCreator
{
    public void Open()
    {
        var document = CreateDocument();
        document.Render();
    }

    protected abstract IDocument CreateDocument();
}

public interface IDocument
{
    void Render();
}

public class PdfCreator : DocumentCreator
{
    protected override IDocument CreateDocument() => new PdfDocument();
}

public class PdfDocument : IDocument
{
    public void Render()
    {
        Console.WriteLine("Render PDF");
    }
}`,
    hintsEn: [
      "Subclass decides which concrete product to create.",
      "Creation is deferred to a method override.",
      "The creator uses the product through an interface."
    ],
    hintsTr: [
      "Alt sınıf hangi somut ürünün oluşturulacağına karar verir.",
      "Oluşturma, override edilen bir metoda ertelenir.",
      "Creator, ürünü bir interface üzerinden kullanır."
    ],
    options: ["Factory Method", "Abstract Factory", "Template Method", "Singleton"],
    correctOption: "Factory Method",
    explanationEn:
      "The creator defines a factory method that subclasses override to decide which document to instantiate.",
    explanationTr:
      "Creator, alt sınıfların hangi document'i oluşturacağını belirlediği bir factory method tanımlar.",
    whyNotOthers: [
      "Abstract Factory creates families of products, which is not shown.",
      "Template Method is about algorithm steps, not object creation.",
      "Singleton enforces a single instance, not creation through overrides."
    ]
  },
  {
    id: "q5",
    title: "Legacy payments",
    difficulty: "medium",
    category: "structural",
    codeSnippet: `public interface IPaymentGateway
{
    void Charge(decimal amount);
}

public class LegacyBillingSystem
{
    public void MakePayment(string cents)
    {
        Console.WriteLine($"Charging {cents} cents");
    }
}

public class BillingAdapter : IPaymentGateway
{
    private readonly LegacyBillingSystem _legacy;

    public BillingAdapter(LegacyBillingSystem legacy)
    {
        _legacy = legacy;
    }

    public void Charge(decimal amount)
    {
        var cents = (amount * 100).ToString("F0");
        _legacy.MakePayment(cents);
    }
}`,
    hintsEn: [
      "Old API cannot be modified but must match a new interface.",
      "Wrapper converts the input format.",
      "Client code depends on the target interface."
    ],
    hintsTr: [
      "Eski API değiştirilemez ama yeni bir interface ile uyumlu olmalıdır.",
      "Wrapper giriş formatını dönüştürür.",
      "Client code target interface'e bağlıdır."
    ],
    options: ["Adapter", "Bridge", "Decorator", "Proxy"],
    correctOption: "Adapter",
    explanationEn:
      "The adapter wraps the legacy system and converts the call to match the new gateway interface.",
    explanationTr:
      "Adapter, legacy system'i sarar ve çağrıyı yeni gateway interface'ine uyarlamak için dönüştürür.",
    whyNotOthers: [
      "Bridge separates abstraction and implementation, not seen here.",
      "Decorator adds behavior while keeping the same interface, not translation.",
      "Proxy controls access without adapting incompatible interfaces."
    ]
  },
  {
    id: "q6",
    title: "Launch sequence",
    difficulty: "hard",
    category: "structural",
    codeSnippet: `public class Lights
{
    public void Dim() => Console.WriteLine("Lights dimmed");
}

public class Projector
{
    public void On() => Console.WriteLine("Projector on");
}

public class Speakers
{
    public void Surround() => Console.WriteLine("Surround mode");
}

public class MovieNightFacade
{
    private readonly Lights _lights = new();
    private readonly Projector _projector = new();
    private readonly Speakers _speakers = new();

    public void StartMovie()
    {
        _lights.Dim();
        _projector.On();
        _speakers.Surround();
    }
}`,
    hintsEn: [
      "A single entry point coordinates multiple subsystems.",
      "Clients use a simplified API.",
      "Subsystems remain unchanged."
    ],
    hintsTr: [
      "Tek bir giriş noktası birden çok subsystem'i koordine eder.",
      "Client'lar basitleştirilmiş bir API kullanır.",
      "Subsystem'ler değişmeden kalır."
    ],
    options: ["Facade", "Mediator", "Singleton", "Chain of Responsibility"],
    correctOption: "Facade",
    explanationEn:
      "The facade provides a simplified interface to multiple subsystems for a single use case.",
    explanationTr:
      "Facade, tek bir kullanım senaryosu için birden çok subsystem'e basit bir arayüz sağlar.",
    whyNotOthers: [
      "Mediator coordinates peer objects with complex interactions, not a simple wrapper.",
      "Singleton is about one instance, not a unified API.",
      "Chain of Responsibility passes requests along handlers, which is not present."
    ]
  },
  {
    id: "q7",
    title: "Editor commands",
    difficulty: "medium",
    category: "behavioral",
    codeSnippet: `public interface ICommand
{
    void Execute();
}

public class BoldCommand : ICommand
{
    private readonly Editor _editor;

    public BoldCommand(Editor editor)
    {
        _editor = editor;
    }

    public void Execute()
    {
        _editor.ToggleBold();
    }
}

public class Toolbar
{
    private readonly Dictionary<string, ICommand> _commands = new();

    public void Register(string key, ICommand command) => _commands[key] = command;

    public void Click(string key)
    {
        if (_commands.TryGetValue(key, out var command))
        {
            command.Execute();
        }
    }
}`,
    hintsEn: [
      "Requests are encapsulated as objects.",
      "Invoker triggers actions without knowing receivers.",
      "Commands can be stored and invoked later."
    ],
    hintsTr: [
      "İstekler nesne olarak kapsüllenir.",
      "Invoker, receiver'ı bilmeden eylemleri tetikler.",
      "Command'lar saklanabilir ve daha sonra çalıştırılabilir."
    ],
    options: ["Command", "Observer", "Strategy", "Template Method"],
    correctOption: "Command",
    explanationEn:
      "The toolbar invokes commands that encapsulate editor actions, decoupling invoker from receiver.",
    explanationTr:
      "Toolbar, editor eylemlerini kapsülleyen Command nesnelerini çağırarak invoker ile receiver'ı ayrıştırır.",
    whyNotOthers: [
      "Observer focuses on event subscriptions rather than encapsulated requests.",
      "Strategy swaps algorithms but does not model invocations as objects.",
      "Template Method relies on inheritance, not command objects."
    ]
  },
  {
    id: "q8",
    title: "Order lifecycle",
    difficulty: "hard",
    category: "behavioral",
    codeSnippet: `public interface IOrderState
{
    void Advance(OrderContext context);
    string Status { get; }
}

public class PendingState : IOrderState
{
    public string Status => "Pending";

    public void Advance(OrderContext context)
    {
        context.SetState(new ApprovedState());
    }
}

public class ApprovedState : IOrderState
{
    public string Status => "Approved";

    public void Advance(OrderContext context)
    {
        context.SetState(new ShippedState());
    }
}

public class OrderContext
{
    private IOrderState _state = new PendingState();

    public void SetState(IOrderState state) => _state = state;

    public void Next() => _state.Advance(this);

    public string CurrentStatus => _state.Status;
}`,
    hintsEn: [
      "Behavior changes based on internal state objects.",
      "State transitions are explicit in state classes.",
      "Context delegates behavior to current state."
    ],
    hintsTr: [
      "Davranış, iç state nesnelerine göre değişir.",
      "State geçişleri state sınıflarında açıkça tanımlıdır.",
      "Context davranışı mevcut state'e devreder."
    ],
    options: ["State", "Strategy", "Chain of Responsibility", "Singleton"],
    correctOption: "State",
    explanationEn:
      "The context delegates behavior to state objects that manage transitions between order states.",
    explanationTr:
      "Context, order state'leri arasında geçişleri yöneten state nesnelerine davranışı devreder.",
    whyNotOthers: [
      "Strategy swaps algorithms but does not model transitions as part of the state.",
      "Chain of Responsibility passes requests along handlers instead of changing state.",
      "Singleton provides a single instance, not state-specific behavior."
    ]
  }
];
