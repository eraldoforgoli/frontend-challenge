## Notes

Regarding the slider challange, the HTML is not that modular (or split into components).
To do so, i would have to use custom HTML elements (web compponents), which i didn't see as reasonable for this challange.

If I would use React.js, the component would be modular.

I would provide an API as follows:

```
interface Slide {
  title: string;
  subtitle: string;
  gradient: Gradient;
  icon: ReactNode;
  autoPlay?: boolean;
  stepDuration?: number;
}

interface Gradient {
  startColor: string;
  endColor: string;
}

interface Props {
  slides: Slide[];
}

const Slider: React.FC<Props> = ({ slides }) => {
  /*
    Sliding logic goes heree
    Maybe i would use  react-motion, or a library that would
    ease the pain of codin the whole javascript logic.

    If I'd have to use logic, I'd wrap it in a custom hook,
    so the Slider component is  clean

  */

  return (
    <div>
      {slides.map((el, index) => (
          /*
                Not the ideal, ideally but i would need an unique
                key to hint react that the element is conceptually the same,
                even though in different order, etc, so React can use the
                same Host Instance (dom element) and not to re-render the
                elements from the beginning.
          /*
        <SlideComponent key={`${index}_${el.title}`} {...el} />
      ))}
    </div>
  );
};


const SlideComponent: React.FC<Slide> = ({ title, subtitle, icon }) => {
  return (
    <>
      <div className="heading">
        <h2>{title}</h2>
        <p className="description">{subtitle}</p>
      </div>
      <div className="gradient-container">{icon}</div>
    </>
  );
};




```

The usage would be:

```
export default function App() {
    /*
        useMemo is not really needed here, but in case the App would re-render,
        no need to redeclare the slides again
    /*
  const slides: Slide[] = useMemo(() => [
    {
      title: "Gradients",
      subtitle: "Start, end, angle",
      gradient: {
        startColor: "blue",
        endColor: "red"
      },
      icon: <p> Some icon here </p>
    },
    {
      title: "Presents",
      subtitle: "Manage Presets",
      gradient: {
        startColor: "yellow",
        endColor: "red"
      },
      icon: <p> Some icon here </p>
    },
    {
      title: "Colors",
      subtitle: "Pick any color",
      gradient: {
        startColor: "yellow",
        endColor: "red"
      },
      icon: <p> Some icon here </p>
    }
  ], []);

  return (
    <div className="App">
      <Slider slides={slides} />
    </div>
  );
}

```

Regarding the modularity in the React component, some other ways of building a more modular component would be:

1. Passing a render function, so the coponent is more customizable (Kinda using render-props). I have seen this pattern a lot in React Native (FlatList, etc), and allows the user of this
   component to customize the UI of the Slider. The slider itself would be responsible for the sliding logic.

2. Passing an <Ilustration /> component, instead of the gradient.
   Doing so, the user of the component could be able to pass custom elements (not limited to Gradient with an icon)
