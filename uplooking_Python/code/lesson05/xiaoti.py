In [1]: st = "a.s1_b.s2_c.s3_d.s4_e.s5"

In [2]: result = []

In [3]: st.split('-')
Out[3]: ['a.s1_b.s2_c.s3_d.s4_e.s5']

In [4]: st.split('_')
Out[4]: ['a.s1', 'b.s2', 'c.s3', 'd.s4', 'e.s5']

In [5]: r1 = []

In [6]: r2 = []

In [7]: for r in st.split('_'):
       ...:     if r1:
              ...:         r2.append("_".join(r1))
                 ...:     r1.append(r)
                    ...:

                        In [8]: r1
                        Out[8]: ['a.s1', 'b.s2', 'c.s3', 'd.s4', 'e.s5']

                        In [9]: r2
                        Out[9]: ['a.s1', 'a.s1_b.s2', 'a.s1_b.s2_c.s3', 'a.s1_b.s2_c.s3_d.s4']

                        In [10]:
