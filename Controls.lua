-- Basic control structure examples in Lua

-- If-else control
local function checkNumber(num)
    if num > 0 then
        print(num .. " is positive.")
    elseif num < 0 then
        print(num .. " is negative.")
    else
        print(num .. " is zero.")
    end
end

-- For loop control
local function printNumbers(n)
    for i = 1, n do
        print(i)
    end
end

-- While loop control
local function countdown(n)
    while n > 0 do
        print(n)
        n = n - 1
    end
    print("Blast off!")
end

-- Repeat-until loop control
local function repeatUntilExample()
    local count = 1
    repeat
        print("Count is " .. count)
        count = count + 1
    until count > 5
end

-- Function calls to demonstrate controls
checkNumber(10)
checkNumber(-5)
checkNumber(0)

printNumbers(5)

countdown(3)

repeatUntilExample()
