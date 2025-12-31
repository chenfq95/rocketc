/* eslint-disable react-hooks/refs */

import { type FC, useEffect, useRef, useState } from 'react';
import {
  ReactShortcutProvider,
  useShortcut,
} from '@rocketc/react-use-shortcuts';
import {
  Card,
  CardContent,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@rocketc/react';
import './App.css';
import '@rocketc/react/style.css';

function App() {
  return (
    <>
      <header className="header">
        <h1>Click below area start to try!</h1>
      </header>
      <main className="body">
        <ReactShortcutProvider options={{ debug: true }}>
          <Main title="Global strict mode" enable={true} />
        </ReactShortcutProvider>
        <ReactShortcutProvider options={{ debug: true, strict: false }}>
          <Main title="Global loose mode" enable={true} />
        </ReactShortcutProvider>
        <ReactShortcutProvider
          options={{ debug: true, strict: false, auto: false }}
        >
          <ScopedShortcutRegistry />
        </ReactShortcutProvider>
      </main>
    </>
  );
}

interface MainProps {
  title: string;
  enable: boolean;
}

const Main: FC<MainProps> = function Main(props) {
  const [keyPressed, setKeyPressed] = useState<string>('');

  const { onKeydown, getCurrentKeyPressed } = useShortcut();

  useEffect(() => {
    if (props.enable) {
      return onKeydown(() => {
        setKeyPressed(getCurrentKeyPressed());
      });
    }
  }, [props.enable, onKeydown, getCurrentKeyPressed]);

  return (
    <Card>
      <CardTitle>{props.title}</CardTitle>
      <CardContent>
        <h3>You Pressed: {keyPressed}.</h3>
        <Input />
        <Textarea />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option1</SelectItem>
            <SelectItem value="2">Option1</SelectItem>
          </SelectContent>
        </Select>
        <div
          style={{ width: '100%', height: '100px', border: '1px solid red' }}
          contentEditable={true}
        ></div>
      </CardContent>
    </Card>
  );
};

const ScopedShortcutRegistry = () => {
  const { attachElement } = useShortcut();
  const [scope, setScope] = useState<HTMLElement | null>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const handleSwitch = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      setScope(ref.current);
    }
  };

  useEffect(() => {
    setScope(ref1.current as HTMLElement);
  }, []);

  useEffect(() => {
    if (scope) {
      return attachElement(scope);
    }
  }, [scope, attachElement]);

  return (
    <>
      <div ref={ref1} tabIndex={-1}>
        <Switch
          onCheckedChange={(checked) => handleSwitch(checked ? ref1 : ref2)}
          checked={!!scope && scope === ref1.current!}
        />
        <Main title="Scope 1" enable={scope === ref1.current!} />
      </div>
      <div ref={ref2} tabIndex={-1}>
        <Switch
          onCheckedChange={(checked) => handleSwitch(checked ? ref2 : ref1)}
          checked={!!scope && scope === ref2.current!}
        />
        <Main title="Scope 2" enable={scope === ref2.current!} />
      </div>
    </>
  );
};

export default App;
