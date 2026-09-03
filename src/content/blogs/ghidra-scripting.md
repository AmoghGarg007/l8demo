## why automate

Every time you open a new binary in Ghidra, the first twenty minutes are the same: renaming `FUN_00401234` to something meaningful, identifying struct layouts, and stripping junk instructions left by obfuscation passes. That's boring. Let's script it.

## auto-labelling with heuristics

Ghidra's Python API (`ghidra.program.model`) lets you iterate every function and apply heuristics. For example, functions that call `malloc` followed by a size-dependent loop are probably allocators. Functions that reference string constants can be named after those strings.

```python
# ghidra_scripts/auto_label.py
from ghidra.program.model.symbol import SourceType

fm = currentProgram.getFunctionManager()
for func in fm.getFunctions(True):
    refs = getReferencesFrom(func.getEntryPoint())
    for ref in refs:
        data = getDataAt(ref.getToAddress())
        if data and data.hasStringValue():
            label = data.getValue()[:32].replace(" ", "_")
            func.setName(f"str_{label}", SourceType.USER_DEFINED)
            break
```

## stripping obfuscation junk

A common obfuscation pattern inserts dead `jmp` instructions and opaque predicates. These inflate the control flow graph and make decompilation unreadable. A simple Ghidra script can detect and NOP out the most common patterns:

```python
# ghidra_scripts/strip_junk.py
from ghidra.program.model.listing import CodeUnit

listing = currentProgram.getListing()
mem = currentProgram.getMemory()

for block in mem.getBlocks():
    if not block.isExecute():
        continue
    addr = block.getStart()
    while addr < block.getEnd():
        inst = listing.getInstructionAt(addr)
        if inst and is_opaque_predicate(inst):
            nop_instruction(inst)
        addr = addr.add(inst.getLength() if inst else 1)
```

## the struct recovery trick

If you see repeated field accesses at consistent offsets from a register, that's probably a struct. This script groups accesses by base register and offset, then proposes struct definitions:

```python
# Pseudocode for struct inference
offsets = defaultdict(set)
for inst in function.getInstructions():
    if has_displacement(inst):
        base, disp = extract_base_displacement(inst)
        offsets[base].add(disp)

for base, disps in offsets.items():
    print(f"Probable struct via {base}:")
    for d in sorted(disps):
        print(f"  +0x{d:x}: field_{d:x}")
```

## takeaways

- Ghidra scripting saves hours on repetitive RE tasks
- Start with string-based labelling — it's the highest-value, lowest-effort automation
- Opaque predicate detection doesn't need to be perfect; even 70% accuracy cleans up the CFG dramatically
- Export your scripts as a shared repo so the whole team benefits
